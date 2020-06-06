import { View } from "native-base";
import React, { useState } from "react";
import { Alert, AsyncStorage } from "react-native";
import { localizations } from "../assets/i18n/localizations";
import { Colors } from "../variables/colors";
import { Chip } from "./Chip";
import { DreamItem } from "./DreamItem";

export default function DreamList() {
    const [dreams, setDreams] = useState([]);
    const [initialDreams, setInitialDreams] = useState([]);
    const [searchKeywords, setSearchKeywords] = useState([]);

    // Utility functions

    async function loadDreams() {
        try {
            let dreams_from_storage = await AsyncStorage.getItem("dreams");
            dreams_from_storage = JSON.parse(dreams_from_storage);
            if (dreams_from_storage) {
                console.info("Loaded Dreams");
                console.log(dreams_from_storage);
                setDreams(dreams_from_storage);
                setInitialDreams(dreams_from_storage);
            }
        } catch (error) {
            console.warn("Couldn't load Dreams");
        }
    }

    function dreams_reset() {
        setDreams(initialDreams);
    }

    // Filtering functions START

    function dreams_filter_by_any(text) {
        if (text && text.length > 0) {
            const dreams = initialDreams.filter(
                (dream) =>
                    JSON.stringify(dream)
                        .toLowerCase()
                        .indexOf(text.toLowerCase()) > -1
            );
            setDreams(dreams);
            setSearchKeywords(searchKeywords);
        } else {
            dreams_reset();
            setSearchKeywords(searchKeywords);
        }
    }

    function dreams_filter_by_keywords(keywords) {
        if (keywords && keywords.length > 0) {
            const dreams = initialDreams.filter((dream) => {
                let matches_all_keywords = true;

                keywords.map((keyword) => {
                    if (dream.keywords.indexOf(keyword) === -1) {
                        matches_all_keywords = false;
                    }
                });

                return matches_all_keywords;
            });

            setDreams(dreams);
        } else {
            dreams_reset();
            setSearchKeywords([]);
        }
    }

    function dreams_filter_by_date(date) {
        if (date && date.length > 0) {
            const dreams = initialDreams.filter((dream) => {
                return (
                    new Date(dream.dateTo)
                        .toString()
                        .split(" ")
                        .slice(1, 4)
                        .join(" ") === date ||
                    new Date(dream.dateFrom)
                        .toString()
                        .split(" ")
                        .slice(1, 4)
                        .join(" ") === date
                );
            });

            setDreams(dreams);
            setSearchKeywords(searchKeywords);
        } else {
            dreams_reset();
            searchKeywords(searchKeywords);
        }
    }

    //// filtering utility functions
    function removeFilteredKeyword(keyword) {
        const searchKeywords = searchKeywords.filter((k) => k !== keyword);
        dreams_filter_by_keywords(searchKeywords);
    }

    // Filtering functions END

    // Dream manipulation functions START

    function onClickDelete(dream) {
        Alert.alert(
            "",
            localizations.deleteAlertMessage,
            [
                {
                    text: localizations.deleteAlertNo,
                    onPress: () => console.log("Cancel presed"),
                    style: "cancel",
                },
                {
                    text: localizations.deleteAlertYes,
                    onPress: () => deleteDream(dream),
                },
            ],
            { cancelable: false }
        );
    }

    async function deleteDream(existing_dream) {
        const dreams_new = dreams_new.filter(
            (dream_to_delete) => dream_to_delete.id !== existing_dream.id
        );
        await AsyncStorage.setItem("dreams", JSON.stringify(dreams_new));
        setDreams(dreams_new);
        setInitialDreams(dreams_new);
    }

    // Dream manipulation functions END

    function renderAlbums() {
        return dreams.map((dream) => {
            return (
                <DreamItem
                    key={"dream_" + dream.id}
                    onPressChip={(keyword) => {
                        dreams_filter_by_keywords([
                            ...searchKeywords,
                            ...[keyword],
                        ]);
                    }}
                    onPress={() => {
                        props.onPress(dream);
                    }}
                    onDelete={() => onClickDelete(dream)}
                    onEdit={() => props.onEdit(dream)}
                    dream={dream}
                    trimText={true}
                    showButtons={true}
                    showEvents={false}
                />
            );
        });
    }

    // CALL FUNCTIONS
    loadDreams(); // load functions async

    return (
        <View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {searchKeywords.map((keyword) => (
                    <View
                        style={{ flexDirection: "column" }}
                        key={"dream_chip_" + keyword}
                    >
                        <Chip
                            chipColor={Colors.secondary}
                            showRemove={true}
                            key={"dream_chip_" + keyword}
                            text={keyword}
                            onPress={() => {
                                removeFilteredKeyword(keyword);
                            }}
                        />
                    </View>
                ))}
            </View>

            <View>{renderAlbums()}</View>
        </View>
    );
}
