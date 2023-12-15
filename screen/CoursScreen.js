import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const CoursScreen = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://172.20.10.2:8000/api/courss");
                setData(response.data['hydra:member']);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("La requête a été annulée", error.message);
                } else {
                    console.error("Erreur de requête API :", error);
                }
            }
        };

        fetchData();
    }, []);

    const handleViewStudents = (coursId) => {
        navigation.navigate('ListeScreen', { coursId });
    };

    const handleCreateCours = () => {
        navigation.navigate('CreationCours');
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };


    const handleCancelCourse = async (coursId) => {
        const updatedData = data.map(item =>
            item.id === coursId ? { ...item, maintient: !item.maintient } : item
        );
        setData(updatedData);

        await axios.put(`http://172.20.10.2:8000/api/courss/${coursId}`, {
            maintient: !data.find(item => item.id === coursId).maintient,
            dateCours: data.find(item => item.id === coursId).dateCours,
            heure: data.find(item => item.id === coursId).heure,
        });
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <TouchableOpacity onPress={() => handleCreateCours()} style={styles.createButton}>
                <Text style={styles.createButtonText}>Créer un cours</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                {data.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <Text style={styles.cardText}>
                            Le cours du {formatDate(item.dateCours)} maintenu : {item.maintient ? "oui" : "non"}
                        </Text>
                        <TouchableOpacity onPress={() => handleViewStudents(item.id)} style={styles.cardButton}>
                            <Text style={styles.buttonText}>Voir les élèves</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleCancelCourse(item.id)} style={styles.cardButton}>
                            <Text style={styles.buttonText}>{item.maintient ? "Annuler le cours" : "Maintenir le cours"}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 8,
    },
    cardButton: {
        backgroundColor: "grey",
        padding: 8,
        borderRadius: 4,
        marginTop: 8,
    },
    buttonText: {
        color: "#ffffff",
        textAlign: "center",
    },
    scroll: {
        flex: 1,
        padding: 16,
    },
    createButton: {
        backgroundColor: "black",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    createButtonText: {
        color: "#ffffff",
        textAlign: "center",
    },
});

export default CoursScreen;
