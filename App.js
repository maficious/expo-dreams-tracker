import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { AsyncStorage, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import DreamDetails from "./src/views/DreamDetails";
import Home from "./src/views/Home";
import CreateDream from "./src/views/CreateDream";
import EditDream from "./src/views/EditDream";
import localizations from "./assets/i18n/localizations";

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

export default function App() {
	const [isFirstRun, setIsFirstRun] = useState(true);

	function get_is_first_run() {
		AsyncStorage.getItem("isFirstRun", (error, result) => {
			console.log("GET isFirstRun");
			if (error) 	console.log("\t| ERR:", error);
			if (result) console.log("\t| RES:", result);
		}).then(value => {
			let answer = JSON.parse(value);
			// console.log("is it first run? " + answer.isFirstRun);
			if (answer === null || answer === undefined) {
				setIsFirstRun(true);
			} else {
				setIsFirstRun(false);
			}
		});
	}

	useEffect(() => {
		// get_is_first_run();
	}, []);

	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<RootStack.Navigator initialRouteName={isFirstRun ? "intro0" : "MainApp"}>
					<RootStack.Screen name="intro0"  component={Intro0}  options={{ headerShown: false }} />
					<RootStack.Screen name="intro1"  component={Intro1}  options={{ headerShown: false }} />
					<RootStack.Screen name="intro2"  component={Intro2}  options={{ headerShown: false }} />
					<RootStack.Screen name="intro3"  component={Intro3}  options={{ headerShown: false }} />
					<RootStack.Screen name="intro4"  component={Intro4}  options={{ headerShown: false }} />
					{/* Main app, previous screens should never ever appear after the first run */}
					<RootStack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
				</RootStack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

function Intro0({ navigation }) {
	return (
		<SafeAreaView style={[introStyles.container, { backgroundColor: "#25C6DF" }]}>
			<Text style={[introStyles.text, { fontSize: 36, textAlign: "right" }]}>
				Привет, друг!{"\n"}Рада тебе 🤗
			</Text>
			<Text style={introStyles.text}>
				Добро пожаловать в мое приложение. Это приложение поможет тебе лучше разобраться в себе. Оно будет
				незаменимым помощником в процессе терапии, если ты в ней находишься, а также в трудные моменты жизни или
				в любой другой момент времени, когда захочешь познакомиться с необъятным миром под названием «Я сам(а)».
			</Text>
			<TouchableOpacity style={introStyles.nextButtonContainer} onPress={() => navigation.navigate("intro1")}>
				<Text style={introStyles.nextButtonText}>{localizations.IntroNextButtonText}</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
function Intro1({ navigation }) {
	return (
		<SafeAreaView style={[introStyles.container, { backgroundColor: "#DE6B10" }]}>
			<Text style={[introStyles.text, { fontSize: 36, textAlign: "center" }]}>Не секрет...</Text>
			<Text style={introStyles.text}>
				...что наше сознание это всего лишь верхушка айсберга и поведении человека очень сильно влияет
				подсознание. Сны — это метафорический формат того что творится у тебя в бессознательном. Это своего
				рода, последние сводки с полей бессознательного. 😎
			</Text>
			<TouchableOpacity style={introStyles.nextButtonContainer} onPress={() => navigation.navigate("intro2")}>
				<Text style={introStyles.nextButtonText}>{localizations.IntroNextButtonText}</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const Check = () => (
	<View style={{ margin: 10 }}>
		<Ionicons name="ios-checkmark-circle-outline" size={20} color="white" />
	</View>
);

function Intro2({ navigation }) {
	return (
		<SafeAreaView style={[introStyles.container, { backgroundColor: "#B33CDE" }]}>
			<Text style={[introStyles.text, { fontSize: 36, textAlign: "center" }]}>
				Что тебе может дать это приложение:
			</Text>
			<Text style={[introStyles.text, { textAlign: "left" }]}>
				• Ты сможешь систематизировать свои сны. {"\n"}• Сможешь быстро «доставать» нужные сны по ключевым
				словам.{"\n"}• Сможешь лучше рефлексировать по поводу сообщений, которые посылает тебе твое
				Бессознательное.
			</Text>
			<TouchableOpacity style={introStyles.nextButtonContainer} onPress={() => navigation.navigate("intro3")}>
				<Text style={introStyles.nextButtonText}>{localizations.IntroNextButtonText}</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

function Intro3({ navigation }) {
	return (
		<SafeAreaView style={[introStyles.container, { backgroundColor: "#E05147" }]}>
			<Text style={[introStyles.text, { fontSize: 36, textAlign: "center" }]}>
				Как лучше пользоваться приложением:
			</Text>
			<Text style={[introStyles.text, { textAlign: "left" }]}>
				• Здесь ты можешь записывать свои сны, и события, произошедшие непосредственно перед сном, которые могли
				повлиять на сон, на его формы, символы и образы. {"\n"}• Выставлять ключевые слова. {"\n"}• Искать
				эмоционально значимые слова.{"\n"}• Систематизировать свои сны и видеть динамику того, что происходит у
				тебя в бессознательном. {"\n"}• Отслеживать изменения так называемых «повторяющихся» (рекурентных) снов.
				{"\n"}• Видеть динамику и улучшения своего психотерапевтического процесса, если ты находишься в процессе
				психотерапии.
			</Text>
			<TouchableOpacity style={introStyles.nextButtonContainer} onPress={() => navigation.navigate("intro4")}>
				<Text style={introStyles.nextButtonText}>{localizations.IntroNextButtonText}</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

function Intro4({ navigation }) {
	return (
		<SafeAreaView style={[introStyles.container, { backgroundColor: "#25C261" }]}>
			<Text style={[introStyles.text, { fontSize: 36, textAlign: "center" }]}>
				Какой практический смысл это может иметь?!
			</Text>
			<Text style={[introStyles.text, { fontSize: 16 }]}>
				Часто через сны с нами разговаривает наша Интуиция. Чтобы развивать интуицию важно уметь ее слышать и
				слушать. Интуиция — как Яндекс-навигатор на жизненном пути, позволит не сворачивать в тупики, не
				вставать в пробки, не превышать скорость и выбирать оптимальное направление. Читать сны — это, пожалуй,
				лучший способ слышать интуицию.
			</Text>
			<Text
				style={[
					introStyles.text,
					{ fontStyle: "italic", fontSize: 20, textAlign: "right", alignSelf: "flex-end" }
				]}>
				— Каминат Касимова, психолог.
			</Text>
			<TouchableOpacity style={introStyles.nextButtonContainer} onPress={() => navigation.navigate("MainApp")}>
				<Text style={introStyles.nextButtonText}>{localizations.IntroNextButtonText}</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const introStyles = StyleSheet.create({
	container: {
		flex       : 1,
		alignItems : "center"
	},
	nextButtonContainer: {
		backgroundColor   : "rgba(255,255,255,.2)",
		paddingVertical   : 10,
		paddingHorizontal : 20,
		borderRadius      : 10,
		position          : "absolute",
		bottom            : 60
	},
	nextButtonText: {
		color    : "white",
		fontSize : 18
	},
	text: {
		color         : "white",
		textAlign     : "justify",
		fontSize      : 18,
		padding       : 20,
		paddingBottom : 5
	}
});

function MainApp() {
	async function set_is_not_first_run() {
		AsyncStorage.setItem("isFirstRun", JSON.stringify({ isFirstRun: false }), (error, result) => {
			console.log("SET isFirstRun");
			if (error)  console.log("\t| ERR:", error);
			if (result) console.log("\t| RES:", result);
		});
	}

	useEffect(() => {
		set_is_not_first_run();
	}, []);

	return (
		<MainStack.Navigator mode="modal" initialRouteName="Home">
			<MainStack.Screen
                name      = "Home"
                component = {Home}
                options   = {{ title: localizations.DreamsListHeaderTitle }} />
			<MainStack.Screen
				name      = "CreateDream"
				component = {CreateDream}
				options   = {{ title: localizations.CreateDreamHeaderTitle }}
			/>
			<MainStack.Screen
				name      = "EditDream"
				component = {EditDream}
				options   = {{ title: localizations.EditDreamHeaderTitle }}
			/>
			<MainStack.Screen
				name      = "DreamDetails"
				component = {DreamDetails}
				options   = {{ title: localizations.DreamDetailsHeaderTitle }}
			/>
		</MainStack.Navigator>
	);
}
