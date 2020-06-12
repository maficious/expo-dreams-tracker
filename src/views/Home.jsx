import moment from "moment";
import "moment/locale/ru";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { AsyncStorage, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import localizations from "../../assets/i18n/localizations";
import HeaderButtons from "../components/HeaderButtons";
import Chip from "../components/Chip";
import * as FileSystem from "expo-file-system";
import * as MailComposer from "expo-mail-composer";

moment.locale("ru"); // change moment's locale to russian

export default function Home({ navigation }) {
	// shoud be empty by default; loaded from storage;
	const [initialDreams, setInitialDreams] = useState([]);
	const [dreams, setDreams] = useState([]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<View style={{ flexDirection: "row" }}>
					<HeaderButtons
						buttons={[
							{
								icon: "md-download",
								iconSize: 24,
								onPress: dreams_export
							},
							{
								icon: "md-add",
								iconSize: 32,
								onPress: openNewDreamEditor
							}
						]}
					/>
				</View>
			)
		});
	}, [navigation, dreams_export]);

	// Export dreams in CSV format
	async function dreams_export() {
		if (!(initialDreams.length > 0)) {
			alert(localizations.NothingToExportAlertText);
			return;
		};

		let csvContent = "";

		// add headers
		csvContent += "Название,Описание,Создано,Сон с,Сон до,Ключевые слова\n";
		// add dreams
		csvContent += initialDreams
			.map(d =>
				[
					d.title,
					d.description,
					moment(d.timestamp).format("Do MMM YYYY - HH:mm"),
					moment(d.fromDate).format("Do MMM YYYY - HH:mm"),
					moment(d.toDate).format("Do MMM YYYY - HH:mm"),
					d.tags.join("; ")
				].join(",")
			)
			.join("\n");

			// I don't know if this works, but keep it there for safety...
		try {
			const file = FileSystem.readAsStringAsync(FileSystem.cacheDirectory + "dreams.csv");
			if (file) {
				FileSystem.deleteAsync(FileSystem.cacheDirectory + "dreams.csv");
			}
		} catch (error) {
			console.log("Didn't find the file...");
		}

		FileSystem.writeAsStringAsync(FileSystem.cacheDirectory + "dreams.csv", csvContent);
		MailComposer.composeAsync({
			recipients: [],
			ccRecipients: [],
			bccRecipients: [],
			subject: "Сновидения",
			body: "",
			isHtml: false,
			attachments: [FileSystem.cacheDirectory + "dreams.csv"]
		});

		alert("Exported");
	}

	// Load current dream list in async storage to state
	async function loadDreams() {
		await AsyncStorage.getItem("DREAMS", (error, result) => {
			console.log("Loading dreams from home screen");
			if (error) console.log("\t| ERR:", error);
			if (result) console.log("\t| RES:", typeof result);
		}).then(value => {
			if (value) {
				let dreams = JSON.parse(value);
				// this should be raw, unsorted version of entries from AS
				// operations like createNew, edit, delete, etc. will affect these:
				setInitialDreams(dreams);
				// this on the other hand, will hold edited version of entries
				// operations like search, sort, etc. will affect these:
				dreams.sort((dreamA, dreamB) => dreamA.timestamp < dreamB.timestamp); // sort by most recent
				setDreams(dreams);
			}
		});
	}

	// Create an array of dream entry elements;
	// Later used to fill the list;
	function generate_dreams_list(dreams) {
		const dream_entries_array = [];

		if (dreams !== []) {
			for (const dream of dreams) {
				dream_entries_array.push(
					<DreamEntry
						key={"dream_" + dream.id}
						emoji={dream.emoji}
						tags={dream.tags}
						title={dream.title}
						description={dream.description}
						timestamp={moment(new Date().getTime()).to(dream.timestamp)}
						onPress={() => openDreamDetails(dream.id)}
					/>
				);
			}
		}

		return dream_entries_array;
	}

	// Opens dream details screen via passing the information
	// about the clicked dream; TODO: Remake to load info from Async Storage
	function openDreamDetails(dreamId) {
		navigation.navigate("DreamDetails", {
			dreamId: dreamId,
			dreams: initialDreams,
			onGoBack: refreshDreams
		});
	}

	// Opens dream editor for adding new entry;
	// The only thing we pass is the id for it.
	function openNewDreamEditor() {
		navigation.navigate("CreateDream", {
			dreams: initialDreams,
			onGoBack: refreshDreams
		});
	}

	const refreshDreams = () => {
		loadDreams();
	};

	useEffect(() => {
		loadDreams();
	}, []);

	return <ScrollView style={HOMEStyles.scrollContainer}>{generate_dreams_list(dreams)}</ScrollView>;
}

// styles related to home screen
const HOMEStyles = StyleSheet.create({
	scrollContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});

// Since dream entry is used only here
// I didn't bother creating another file for it.
function DreamEntry(props) {
	function _Animate() {
		// animate the button

		// call inherited function
		props.onPress();
	}

	const createChips = () => {
		let components = props.tags ? props.tags.map(tag => <Chip key={"tag_" + tag} text={tag} />) : [];
		return components;
	};

	return (
		<TouchableWithoutFeedback onPress={_Animate}>
			<View style={DIStyles.container}>
				<View style={DIStyles.headingContainer}>
					<View style={DIStyles.emojiContainer}>
						<Text style={DIStyles.emoji}>{props.emoji}</Text>
					</View>
					<View style={{ flex: 1, padding: 5, paddingTop: 0 }}>
						<Text style={DIStyles.heading}>{props.title}</Text>
						<Text style={DIStyles.timestamp}>
							{localizations.TimestampPrefixText} {props.timestamp}
						</Text>
					</View>
				</View>
				<View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>{createChips()}</View>
				<Text style={DIStyles.description}>{props.description}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
}

// Dream Entry related styles
const DIStyles = StyleSheet.create({
	timestamp: { fontStyle: "italic", color: "#cccccc" },
	heading: {
		fontSize: 24
	},
	description: {
		fontSize: 16,
		// fontStyle: "italic",
		textAlign: "justify"
	},
	headingContainer: { flex: 1, flexDirection: "row" },
	container: {
		margin: 7,
		elevation: 5,
		borderRadius: 10,
		padding: 10,
		backgroundColor: "white"
	},
	emojiContainer: { width: 40 },
	emoji: {
		fontSize: 32,
		textAlign: "center"
	}
});
