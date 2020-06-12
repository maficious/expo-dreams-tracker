import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Chip(props) {
	return (
		<View
			style={{
				flexDirection: "row",
				backgroundColor: "#eee",
				justifyContent: "center",
				alignItems: "center",
				alignSelf: "flex-start",
				margin: 2,
				height: 30,
				borderRadius: 20
			}}>
			{props.isForEditing && (
				<TouchableOpacity
					style={{
						height: 30,
						width: 30,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#dedede",
						borderRadius: 30
					}}>
					<Ionicons name="ios-close" size={24} color="black" />
				</TouchableOpacity>
			)}
			<Text style={{ marginHorizontal:10, color: "white", textAlignVertical: "center", fontSize: 16, color: "black" }}>
				{props.text}
			</Text>
		</View>
	);
}
