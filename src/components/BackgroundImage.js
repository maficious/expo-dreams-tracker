import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Colors } from "../variables/colors";

export default function BackgroundImage() {
    return (
        <View style={styles.containerStyle}>
            <ImageBackground
                source={require("../../assets/images/bg.jpg")}
                style={styles.backgroundImage}
            >
                {props.children}
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    backgroundImage: {
        flex: 1,
    },
});
