import React, { useLayoutEffect } from "react";
import { ScrollView, View, Text, StyleSheet, AsyncStorage } from "react-native";
import HeaderButtons from "../components/HeaderButtons";
import localizations from "../../assets/i18n/localizations";
import moment from "moment";
import Chip from "../components/Chip";

export default function DreamDetails({ route, navigation }) {
	const current_opened_dream_id = route.params.dreamId;
	const dreams = route.params.dreams;
	const dream = dreams.find(dream => dream.id === current_opened_dream_id);

	function openDreamEditorForCurrentDream(dream_id) {
		navigation.navigate("EditDream", {
			dream: dream, // we get id from dream object
			dreams: dreams,
			onPopToTop: () => route.params.onGoBack()
		});
	}

	function deleteThisDream() {
		let new_dreams = dreams.filter(dream => dream.id !== current_opened_dream_id);
		saveDreams(new_dreams);
	}

	async function saveDreams(dreams_array) {
		await AsyncStorage.setItem("DREAMS", JSON.stringify(dreams_array), (error, result) => {
			console.log("Deleted the dream and saved dreams from dream details screen");
			if (error) console.log("\t| ERR:", error);
		});

		// Go back
		route.params.onGoBack();
		navigation.goBack();
	}

	const createChips = () => {
		let components = dream.tags ? dream.tags.map(tag => <Chip key={"tag_" + tag} text={tag} />) : [];
		return components;
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<View style={{ flexDirection: "row" }}>
					<HeaderButtons
						buttons={[
							{
								icon: "ios-trash",
								iconSize: 24,
								onPress: () => deleteThisDream()
							},
							{
								icon: "ios-create",
								iconSize: 24,
								onPress: () => openDreamEditorForCurrentDream(current_opened_dream_id)
							}
						]}
					/>
				</View>
			)
		});
	}, [navigation]);

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.emoji}>{dream.emoji}</Text>
			<Text style={styles.dreamTitle}>{dream.title}</Text>
			<View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
				{createChips()}
			</View>
			<Text>
				{localizations.TimestampPrefixText} {moment(dream.timestamp).format("Do MMMM YYYY, HH:mm")}
			</Text>
			<Text>
				{localizations.DreamDateFromText} {moment(dream.fromDate).format("Do MMMM YYYY, HH:mm")}
			</Text>
			<Text>
				{localizations.DreamDateToText} {moment(dream.toDate).format("Do MMMM YYYY, HH:mm")}
			</Text>
			<Text>{dream.description}</Text>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20
	},
	dreamTitle: {
		fontSize: 26,
		textAlign: "center"
	},
	emoji: {
		fontSize: 48,
		textAlign: "center"
	}
});
