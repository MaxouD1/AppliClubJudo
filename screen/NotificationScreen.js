import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import axios from "axios";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const NotificationScreen = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://172.20.10.2:8000/api/notif");
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return new Date(dateString).toLocaleDateString("fr-FR", options);
    };

    const renderNotificationItem = ({ item }) => (
        <View style={styles.notificationContainer}>
            <MaterialCommunityIcons name="bell" size={30} color="black" />
            <Text style={styles.notificationText}>
                Le cours du : {formatDate(item.dateCours)} est annulé
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {data && data.length > 0 ? (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderNotificationItem}
                    contentContainerStyle={styles.notificationList}
                />
            ) : (
                <Text style={styles.noNotificationText}>Pas de notification.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    notificationList: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    notificationContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
        elevation: 3,
    },
    notificationText: {
        fontSize: 16,
        color: "#333",
    },
    noNotificationText: {
        fontSize: 18,
        color: "#666",
    },
});

export default NotificationScreen;
