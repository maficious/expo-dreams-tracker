import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Button, Icon } from "native-base";
import { Colors } from "../variables/colors";

export default function Chip({
    text,
    onPress,
    showRemove,
    onPressChip,
    chipColor,
    showAdd,
    onPressAdd,
}) {
    let button;
    let cs = { ...styles.containerStyle };
    if (showRemove) {
        button = (
            <Button
                rounded
                icon
                small
                onPress={onPress}
                style={styles.removeButtonStyle}
            >
                <Icon name="close" style={styles.iconStyle} />
            </Button>
        );
    } else if (showAdd) {
        button = (
            <Button
                rounded
                icon
                small
                onPress={onPressAdd}
                style={styles.addButtonStyle}
            >
                <Icon name="add" style={{ color: Colors.dark }} />
            </Button>
        );
    } else {
        cs = { ...cs, ...{ paddingRight: 10 } };
    }
    cs = { ...cs, ...{ backgroundColor: chipColor } };
    const slicedText =
        text && text.length > 15 ? text.slice(0, 15) + "..." : text;
    return (
        <TouchableOpacity style={cs} onPress={onPressChip}>
            <Text
                style={{
                    ...styles.textStyle,
                    ...{ color: showAdd ? Colors.dark : Colors.white },
                }}
            >
                {" "}
                {slicedText}
            </Text>
            {button}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        borderRadius: 15,
        position: "relative",
        alignSelf: "flex-start",
        paddingLeft: 10,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    textStyle: { alignSelf: "center", textAlign: "left", marginRight: 5 },
    iconStyle: {},
    removeButtonStyle: {
        backgroundColor: Colors.secondary,
    },
    addButtonStyle: {
        backgroundColor: Colors.darkGray,
        paddingRight: 0,
    },
});
