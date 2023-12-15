import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/icon.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Bienvenue sur l'Application</Text>
            <Text style={styles.subtitle}>Découvrez notre contenu passionnant</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
        backgroundColor: "#3498db",
        padding: 10,
        borderRadius: 5,
    },
});

export default HomeScreen;
