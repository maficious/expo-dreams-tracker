import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AsyncStorage, Button, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import localizations from "../../assets/i18n/localizations";

// Main component

export default function CreateDream({ route, navigation }) {
	const dreams = route.params.dreams;
	const new_dream_id = dreams.length > 0 ? dreams[0].id + 1 : 0;
	//
	// States:
	//
	////////// Dream data
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [emoji, setEmoji] = useState("🌙");
	const timestamp = new Date().getTime();
	const [toDate, setToDate] = useState(new Date().getTime());
	const [fromDate, setFromDate] = useState(new Date().getTime());
	////////// Date picker
	const [isToDatePickerVisible, setIsToDatePickerVisible] = useState(false);
	const [isFromDatePickerVisible, setIsFromDatePickerVisible] = useState(false);
	const [dateTimePickerMode, setDateTimePickerMode] = useState("date");
	////////// Emoji picker
	const [isEmojiChoserOpened, setIsEmojiChoserOpened] = useState(false);
	const [choserDimensions, setChoserDimensions] = useState({
		width: 200,
		height: 300,
		top: 50
	});

	// FUNCTIONS

	async function saveDreams(dream_object) {
		// Spread existing dreams and add our new dream
		AsyncStorage.setItem("DREAMS", JSON.stringify([...dreams, dream_object]), (error, result) => {
			console.log("Saving dreams from Create Dream screen");
			if (error) console.log("\t| ERR:", error);
		});

		// Go back
		route.params.onGoBack();
		navigation.goBack();
	}

	function showDatePicker(which) {
		Keyboard.dismiss();
		switch (which) {
			case "from":
				setIsFromDatePickerVisible(true);
				break;
			case "to":
				setIsToDatePickerVisible(true);
				break;

			default:
				break;
		}
	}

	// FUNCTIONS END

	return (
		<View
			onLayout={event => {
				setChoserDimensions({
					width: event.nativeEvent.layout.width,
					height: event.nativeEvent.layout.height,
					top: choserDimensions.top
				});
			}}
			style={styles.container}>
			{/* Emoji picker */}
			{isEmojiChoserOpened && (
				<Emojis
					onSelectEmoji={emoji => {
						setEmoji(emoji);
						setIsEmojiChoserOpened(false);
					}}
					_dimensions={choserDimensions}
					onPress={() => setIsEmojiChoserOpened(false)}
				/>
			)}

			{/* ToDate picker */}
			{isToDatePickerVisible && (
				<DateTimePicker
					// testID="fromDateTimePicker"
					value={toDate}
					mode={dateTimePickerMode}
					minimumDate={fromDate}
					is24Hour={true}
					display="default"
					onChange={(event, date) => {
						setIsToDatePickerVisible(false);
						if (date) setToDate(date.getTime());
					}}
				/>
			)}

			{/* FromDate picker */}
			{isFromDatePickerVisible && (
				<DateTimePicker
					// testID="toDateTimePicker"
					value={fromDate}
					mode={dateTimePickerMode}
					maximumDate={toDate}
					is24Hour={true}
					display="default"
					onChange={(event, date) => {
						setIsFromDatePickerVisible(false);
						if (date) setFromDate(date.getTime());
					}}
				/>
			)}

			<View style={{ flexDirection: "row" }}>
				{/* Emoji button */}
				<TouchableOpacity
					style={{
						borderRadius: 10,
						alignItems: "center",
						justifyContent: "center",
						height: 80,
						width: 80,
						backgroundColor: "#eee"
					}}
					onPress={() => setIsEmojiChoserOpened(true)}>
					<Text adjustsFontSizeToFit={false} allowFontScaling={false} style={[styles.emoji, { height: 69 }]}>
						{emoji}
					</Text>
				</TouchableOpacity>
				{/* Title textfield */}
				<TextInput
					autoFocus
					multiline
					numberOfLines={2}
					style={[
						styles.dreamTitle,
						{
							flex: 1,
							marginLeft: 10,
							padding: 5,
							borderRadius: 10,
							textAlign: "center",
							textAlignVertical: "center",
							backgroundColor: "#eee"
						}
					]}
					placeholder={localizations.DreamTitlePlaceholder}
					onChangeText={text => setTitle(text)}>
					{title}
				</TextInput>
			</View>

			{/* Description textfield */}
			<TextInput
				multiline
				numberOfLines={6}
				maxLength={200}
				style={{
					marginVertical: 10,
					borderRadius: 10,
					padding: 10,
					textAlign: "justify",
					fontSize: 18,
					backgroundColor: "#eee"
				}}
				placeholder={localizations.DreamDescriptionPlaceholder}
				onChangeText={text => setDescription(text)}>
				{description}
			</TextInput>

			{/* FromDate selector */}
			<View>
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						style={{
							borderRadius: 10,
							flex: 1,
							padding: 10,
							justifyContent: "center",
							backgroundColor: "#eee"
						}}
						onPress={() => {
							setDateTimePickerMode("date");
							showDatePicker("from");
						}}>
						<Text>{localizations.DreamDateFromText}</Text>
						<Text
							adjustsFontSizeToFit={false}
							// allowFontScaling={false}
							style={{ fontSize: 18 }}>
							{moment(fromDate).format("Do MMMM YYYY")}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							borderRadius: 10,
							marginLeft: 10,
							padding: 10,
							justifyContent: "center",
							backgroundColor: "#eee"
						}}
						onPress={() => {
							setDateTimePickerMode("time");
							showDatePicker("from");
						}}>
						<Text adjustsFontSizeToFit={false} style={{ fontSize: 18 }}>
							{moment(fromDate).format("HH:mm")}
						</Text>
					</TouchableOpacity>
				</View>
				{/* ToDate selector */}
				<View style={{ flexDirection: "row", marginVertical: 10 }}>
					<TouchableOpacity
						style={{
							borderRadius: 10,
							flex: 1,
							padding: 10,
							justifyContent: "center",
							backgroundColor: "#eee"
						}}
						onPress={() => {
							setDateTimePickerMode("date");
							showDatePicker("to");
						}}>
						<Text>{localizations.DreamDateToText}</Text>
						<Text
							adjustsFontSizeToFit={false}
							// allowFontScaling={false}
							style={{ fontSize: 18 }}>
							{moment(toDate).format("D[-е] MMMM YYYY")}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							borderRadius: 10,
							marginLeft: 10,
							padding: 10,
							justifyContent: "center",
							backgroundColor: "#eee"
						}}
						onPress={() => {
							setDateTimePickerMode("time");
							showDatePicker("to");
						}}>
						<Text adjustsFontSizeToFit={false} style={{ fontSize: 18 }}>
							{moment(toDate).format("HH:mm")}
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Save button */}
			<Button
				onPress={() =>
					saveDreams({
						id: new_dream_id,
						emoji: emoji,
						title: title,
						description: description,
						fromDate: fromDate,
						toDate: toDate,
						timestamp: timestamp
					})
				}
				title={localizations.DreamSaveButtonText}
				color={"#3024FF"}
				// disable the button if title or description is empty
				disabled={title === "" ? true : description === "" ? true : false}
			/>
		</View>
	);
}

// Emoji choser

function Emojis(props) {
	return (
		<View
			style={{
				position: "absolute",
				height: props._dimensions.height - 40,
				width: props._dimensions.width - 30,
				// offset by half the height of emoji choser substracted from View's height
				top: (props._dimensions.height - (props._dimensions.height - 40)) / 2,
				alignSelf: "center",
				elevation: 10,
				backgroundColor: "white",
				padding: 10,
				borderRadius: 10,
				zIndex: 1
			}}>
			<EmojiSelector
				onEmojiSelected={emoji => props.onSelectEmoji(emoji)}
				category={Categories.emotion}
				showSearchBar={false}
				showHistory={false}
				showTabs={false}
				showSectionTitles={false}
			/>
			<View
				style={{
					marginTop: 10,
					backgroundColor: "black",
					height: 30,
					width: 30,
					borderRadius: 30,
					justifyContent: "center",
					alignItems: "center",
					alignSelf: "flex-end",
					elevation: 10
				}}>
				<TouchableOpacity onPress={props.onPress}>
					<Ionicons name="ios-close" size={32} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 20
	},
	dreamTitle: {
		fontSize: 26
		// textAlign: "center",
	},
	emoji: {
		fontSize: 48,
		textAlign: "center"
	}
});
