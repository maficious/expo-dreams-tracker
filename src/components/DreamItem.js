import { Body, Button, Card, CardItem, Icon, Left, Right, View } from "native-base";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { localizations } from "../assets/i18n/localizations";
import { Colors } from "../variables/colors";
import { Chip } from "./Chip";


const DreamItem = ({
    dream,
    children,
    trimText,
    onPress,
    onDelete,
    onPressChip,
    onEdit,
    showButtons,
    showEvents = true,
}) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <Card style={{ borderRadius: 10, borderColor: "transparent" }}>
                <CardItem
                    style={{
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        paddingBottom: 0,
                    }}
                >
                    <Body>
                        {/* Title */}
                        <Text style={{ position: "relative", zIndex: 1 }}>
                            {dream.title}
                        </Text>

                        {/* Date */}
                        <Text note style={{ fontSize: 13 }}>
                            {new Date(dream.dateFrom).getDate()}
                            {new Date(dream.dateFrom).getMonth() !=
                                new Date(dream.dateTo).getMonth() &&
                                " " +
                                    localizations[
                                        "month_" +
                                            new Date(dream.dateFrom).getMonth()
                                    ]}
                            {new Date(dream.dateFrom).getFullYear() !=
                                new Date(dream.dateTo).getFullYear() &&
                                " " + new Date(dream.dateTo).getFullYear()}
                            {" - "}
                            {new Date(dream.dateTo).getDate()}
                            {" " +
                                localizations[
                                    "month_" + new Date(dream.dateTo).getMonth()
                                ]}{" "}
                            {new Date(dream.dateTo).getFullYear()}
                        </Text>

                        {/* Keywords */}
                        <View
                            style={{ flexDirection: "row", flexWrap: "wrap" }}
                        >
                            {dream.keywords.map((keyword) => (
                                <View
                                    style={{ flexDirection: "column" }}
                                    key={keyword}
                                >
                                    <Chip
                                        chipColor={Colors.secondary}
                                        showRemove={false}
                                        key={keyword}
                                        text={keyword}
                                        onPressChip={() => {
                                            onPressChip
                                                ? onPressChip(keyword)
                                                : "";
                                        }}
                                    />
                                </View>
                            ))}
                        </View>

                        {/* Mood */}
                        {dream.moods.length > 0 && (
                            <View style={{ paddingTop: 0, marginTop: 0 }}>
                                <Text
                                    style={{
                                        color: "rgba(0,0,0,0.5)",
                                        fontSize: 12,
                                    }}
                                >
                                    {localizations.moodPlaceHolder}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {dream.moods.map((keyword) => (
                                        <View
                                            style={{ flexDirection: "column" }}
                                            key={keyword}
                                        >
                                            <Chip
                                                chipColor={Colors.secondary}
                                                showRemove={false}
                                                key={keyword}
                                                text={keyword}
                                                onPressChip={() => {
                                                    false && onPressChip
                                                        ? onPressChip(keyword)
                                                        : "";
                                                }}
                                            />
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}

                        {/* Description */}
                        {dream.description.length > 0 && (
                            <View style={{ paddingTop: 2 }}>
                                <Text
                                    style={{
                                        color: "rgba(0,0,0,0.5)",
                                        fontSize: 12,
                                    }}
                                >
                                    {localizations.description}
                                </Text>
                                <Text
                                    numberOfLines={2}
                                    style={{ marginBottom: 10 }}
                                >
                                    {dream.description}
                                </Text>
                            </View>
                        )}

                        {/* Dream Events */}
                        {dream.events.length > 0 && showEvents && (
                            <View>
                                <Text
                                    style={{
                                        color: "rgba(0,0,0,0.5)",
                                        fontSize: 12,
                                    }}
                                >
                                    {localizations.keyEvents}
                                </Text>
                                <Text>{dream.events}</Text>
                            </View>
                        )}
                    </Body>
                </CardItem>

                <CardItem
                    footer
                    style={{
                        paddingTop: 0,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                    }}
                >
                    {showButtons && (
                        <Left>
                            <Button small transparent onPress={onEdit}>
                                <Icon
                                    name="create"
                                    style={{ color: Colors.primary }}
                                />
                                <Text style={{ color: Colors.primary }}>
                                    {localizations.edit}
                                </Text>
                            </Button>
                        </Left>
                    )}

                    {showButtons && (
                        <Right>
                            <Button small transparent danger onPress={onDelete}>
                                <Icon name="trash" />
                                <Text>{localizations.delete}</Text>
                            </Button>
                        </Right>
                    )}
                </CardItem>
            </Card>
        </TouchableOpacity>
    );
};

export default DreamItem;
