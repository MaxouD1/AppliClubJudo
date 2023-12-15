import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const ListeScreen = () => {
    const route = useRoute();
    const { coursId } = route.params;
    const [eleve, setEleve] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://172.20.10.2:8000/api/présence/${coursId}`
                );
                setEleve(response.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("La requête a été annulée", error.message);
                } else {
                    console.error("Erreur de requête API :", error);
                }
            }
        };

        fetchData();
    }, [coursId]);
    const nbElevePresent = eleve.present ? eleve.present.length : 0;
    const nbEleveAbsent = eleve.absent ? eleve.absent.length : 0;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Liste des Élèves</Text>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Présents: ({nbElevePresent})</Text>
                <FlatList
                    data={eleve.present}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text>{`${item.nom} ${item.prenom}`}</Text>
                        </View>
                    )}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Absents: ({nbEleveAbsent})</Text>
                <FlatList
                    data={eleve.absent}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text>{`${item.nom} ${item.prenom}`}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#ffffff",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    section: {
        marginBottom: 16,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    itemContainer: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});

export default ListeScreen;