import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const EleveScreen = () => {
    const [dataEleve, setDataEleve] = useState([]);
    const navigation = useNavigation();

    const handleVoirDetails = (eleveId) => {
        navigation.navigate('DetailsEleve', { eleveId });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://172.20.10.2:8000/api/judokas");
                setDataEleve(response.data['hydra:member']);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("La requête a été annulée", error.message);
                } else {
                    console.error("Erreur de requête API :", error);
                }
            }
        };

        fetchData();

        // Cleanup function to cancel the request if the component unmounts
        return () => {
            fetchData.cancel(); // Assuming you have axios.CancelToken
        };
    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            {dataEleve.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={styles.itemContainer}
                    onPress={() => handleVoirDetails(item.id)}
                >
                    <Text style={styles.itemText}>
                         {item.nom} - {item.prenom}
                    </Text>
                    <Text style={styles.detailsText}>Voir les détails</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 15,
    },
    itemContainer: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 8,
    },
    itemText: {
        fontSize: 16,
        marginBottom: 8,
        color: "#333",
    },
    detailsText: {
        color: "#4285f4",
        fontWeight: "bold",
    },
});

export default EleveScreen;
