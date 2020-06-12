import PropTypes from "prop-types";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

export default function HeaderButtons(props) {
	function header_buttons_generate(buttons) {
		const buttons_array = [];

		for (const button of buttons) {
			buttons_array.push(
				<HB
					key={button.icon}
					icon={button.icon}
					iconSize={button.iconSize}
					iconColor="white"
					onPress={button.onPress}
				/>
			);
		}

		return buttons_array;
	}

	return <>{header_buttons_generate(props.buttons)}</>;
}

export function HB(props) {
	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
			<View style={styles.buttonBody}>
				<Ionicons style={styles.icon} name={props.icon} size={props.iconSize} color={props.iconColor} />
			</View>
		</TouchableWithoutFeedback>
	);
}

HB.propTypes = {
	icon: PropTypes.string,
	iconColor: PropTypes.string,
	iconSize: PropTypes.number,
	onPress: PropTypes.func
};

const styles = StyleSheet.create({
	buttonBody: {
		width: 40,
		height: 40,
		borderRadius: 40,
		marginRight: 15,
		backgroundColor: "black"
	},
	icon: { flex: 1, textAlign: "center", textAlignVertical: "center" }
});
