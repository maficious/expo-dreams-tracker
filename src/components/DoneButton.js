import { Button, CardItem, Icon, Left, Right } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Dimensions, Keyboard, LayoutAnimation, StyleSheet, Text, UIManager } from "react-native";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const INPUT_ACCESSORY_HEIGHT = 40;
const defaultStyle = StyleSheet.create({
    Container: {
        alignItems: "center",
        backgroundColor: "#D2D5DB",
        height: INPUT_ACCESSORY_HEIGHT,
        position: "absolute",
        left: 0,
        right: 0
    },
    Text: {
        fontSize: 17,
        color: "#497df7",
        backgroundColor: "transparent",
        paddingHorizontal: 9,
        paddingVertical: 9
    }
});

function KeyboardDoneButton(props) {
    // States START
    const [visibleHeight, setVisibleHeight] = useState(
        Dimensions.get("window").height
    );
    const [hideKA, setHideKA] = useState(true);
    const [opacity, setOpacity] = useState(0);
    // States END

    // Functions START
    function visible_height_update() {
        setVisibleHeight(Dimensions.get("window").height);
    }

    function dismissKeyboardHandler() {
        LayoutAnimation.configureNext({
            duration: 100,
            create: {
                type: LayoutAnimation.Types.linear
            },
            update: {
                type: LayoutAnimation.Types.linear
            }
        });
        // update states
        visible_height_update();
        setHideKA(true);
        setOpacity(0);
        // dismiss keyboard
        Keyboard.dismiss();
    }
    // Functions END

    // Keyboard events listeners START
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    const _keyboardDidShow = () => {
        if (hideKA) {
            LayoutAnimation.configureNext({
                duration: 500,
                create: {
                    type: LayoutAnimation.Types.linear,
                    property: LayoutAnimation.Properties.scaleXY
                },
                update: {
                    type: LayoutAnimation.Types.linear,
                    property: LayoutAnimation.Properties.scaleXY
                }
            });
        }

        // update states
        setVisibleHeight(e.endCoordinates.screenY - INPUT_ACCESSORY_HEIGHT - 1);
        setHideKA(false);
        setOpacity(0);
    };

    const _keyboardDidHide = () => {
        // update states
        visible_height_update();
        setOpacity(0);
        setHideKA(true);
    };
    // Keyboard event listeners END
    
    const style = props.style ? props.style : {};
    // TODO: Isn't used anywhere?
    // const doneStyle = props.doneStyle ? props.doneStyle : {};

    return (
        <CardItem
            style={[
                defaultStyle.Container,
                { opacity: opacity, top: visibleHeight - 1 },
                style
            ]}
            onLayout={e => rotateDevice(e)}
        >
            <Left>
                {props.hasPrev ? (
                    <Button
                        large
                        transparent
                        textStyle={{ color: "white" }}
                        onPress={() => props.onClickPrev()}
                    >
                        <Icon
                            name="ios-arrow-back"
                            style={{ color: "white", fontSize: 25 }}
                        />
                    </Button>
                ) : (
                    <Text></Text>
                )}

                {props.hasNext ? (
                    <Button
                        large
                        transparent
                        textStyle={{ color: "white" }}
                        style={{ marginLeft: props.hasPrev ? 10 : 0 }}
                        onPress={() => props.onClickNext()}
                    >
                        <Icon
                            name="ios-arrow-forward"
                            style={{ color: "white", fontSize: 25 }}
                        />
                    </Button>
                ) : (
                    <Text></Text>
                )}
            </Left>
            <Right>
                <Button
                    large
                    transparent
                    textStyle={{ color: "white" }}
                    onPress={() => dismissKeyboardHandler()}
                >
                    <Icon
                        name="md-close"
                        style={{ color: "white", fontSize: 25 }}
                    />
                </Button>
            </Right>
        </CardItem>
    );
}

KeyboardDoneButton.propTypes = {
    title: PropTypes.string,
    style: PropTypes.object,
    doneStyle: PropTypes.object
};
