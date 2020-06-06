import { Input, Item, Text, View } from "native-base";
import React, { useState } from "react";
import { AsyncStorage } from "react-native";
import { Colors } from "../variables/colors";
import { Chip } from "./Chip";

export default function KeywordContainer() {
    const [storedKeywords, setStoredKeywords] = useState([]);
    const [activeKeywords, setActiveKeywords] = useState([]);
    const [suggestedKeywords, setSuggestedKeywords] = useState([]);
    const [keywordsStorageKey, setKeywordsStorageKey] = useState(
        "storedKeywords"
    );
    const [textInput, setTextInput] = useState("");

    async function get_stored_keywords() {
        const stored_keywords = await AsyncStorage.getItem(keywordsStorageKey);
        if (stored_keywords) {
            setStoredKeywords(JSON.parse(stored_keywords));
        }
    }

    const render_active_keywords = () =>
        activeKeywords.map((keyword) => (
            <View style={{ flexDirection: "column" }} key={keyword}>
                <Chip
                    chipColor={Colors.secondary}
                    showRemove={true}
                    key={keyword}
                    text={keyword}
                    onPress={() => active_keyword_remove(keyword)}
                />
            </View>
        ));

    const render_suggested_keywords = () =>
        suggestedKeywords.map((keyword) => (
            <View style={{ flexDirection: "column" }} key={keyword}>
                <Chip
                    chipColor={Colors.darkGray}
                    showRemove={false}
                    showAdd={true}
                    key={keyword}
                    text={keyword}
                    onPressAdd={() => onClickSuggestion(keyword)}
                />
            </View>
        ));

    function onClickSuggestion(keyword) {
        active_keyword_add(keyword);
        setTextInput("");
        setSuggestedKeywords([]);
    }

    function onChangeInput(text) {
        setTextInput(text);
        if (text[text.length - 1] === ",") {
            active_keyword_add(text.split(",")[0]);
            setTextInput("");
        } else {
            suggested_keywords_generate(text);
        }

        props.onInput();
    }

    function suggested_keywords_generate(text) {
        if (!text || text.length === 0 || text === "") {
            setSuggestedKeywords([]);
            return;
        }

        const suggested_keywords = [];

        for (let i = 0; i < storedKeywords.length; i++) {
            if (storedKeywords[i].indexOf(text) > -1) {
                let isActive = false;

                for (let j = 0; j < activeKeywords.length; j++) {
                    if (activeKeywords[j] === storedKeywords[i]) {
                        isActive = true;
                        break;
                    }
                }

                if (!isActive) suggested_keywords.push(storedKeywords[i]);
            }
        }

        setSuggestedKeywords(suggested_keywords);
    }

    function active_keyword_remove(keyword_to_remove) {
        const active_keywords = activeKeywords.filter(
            (existing_keyword) => existing_keyword !== keyword_to_remove
        );
        setActiveKeywords(active_keywords);
    }

    function active_keyword_add(keyword) {
        if (activeKeywords.indexOf(keyword) === -1) {
            const active_keywords = activeKeywords;
            active_keywords.push(keyword);
            setActiveKeywords(active_keywords);
            keyword_store(keyword);
        }
    }

    async function keyword_store(keyword) {
        if (storedKeywords.indexOf(keyword) === -1) {
            const stored_keywords = storedKeywords;
            stored_keywords.push(keyword);
            setStoredKeywords(stored_keywords);
            await AsyncStorage.setItem(key, JSON.stringify(storedKeywords));
        }
    }

    // CALL FUNCTIONS
    get_stored_keywords();

    return (
        <View
            style={{
                backgroundColor: props.backgroundColor,
                borderTopColor: Colors.placeholderLight,
                borderTopWidth: 1,
            }}
        >
            <View>
                <Text
                    style={{
                        paddingLeft: 15,
                        color: Colors.white,
                        opacity: 0.8,
                        marginTop: 10,
                    }}
                >
                    {props.label}
                </Text>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginLeft: 10,
                }}
            >
                {render_active_keywords()}
            </View>

            <View>
                <Item style={{ borderBottomColor: "transparent" }}>
                    <Input
                        autoCapitalize={"none"}
                        onFocus={() => {
                            props.onFocus();
                        }}
                        autoCorrect={false}
                        keyboardAppearance="dark"
                        placeholder={props.placeholder}
                        onChangeText={(text) => onChangeInput(text)}
                        style={{ color: Colors.white, paddingLeft: 15 }}
                        value={textInput}
                    />
                </Item>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    paddingBottom: suggestedKeywords.length > 0 ? 10 : 0,
                }}
            >
                {render_suggested_keywords()}
            </View>
        </View>
    );
}
