import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icone from "../assets/icon.png";

export const Sidebar = ({ navigation, userRole }) => {

    return (
        <View style={styles.container}>
            <Image source={Icone} style={{ width: 180, height: 180, marginBottom: 20 }} />
            <Text style={styles.title}>Navigation</Text>
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('HomeScreen')}>
                <Feather name="home" size={30} color="black" />
                <Text style={styles.text}>Accueil</Text>
            </TouchableOpacity>
            {userRole === "ROLE_ADMIN" && (
                <View>
                    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('EleveStack')}>
                        <FontAwesome5 name="graduation-cap" size={30} color="black" />
                        <Text style={styles.text}>Membre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('CoursStack')}>
                        <MaterialCommunityIcons name="karate" size={30} color="black" />
                        <Text style={styles.text}>Cours</Text>
                    </TouchableOpacity>
                </View>
            )}
            {userRole === "ROLE_USER" && (
                <View>
                    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('NotificationScreen')}>
                        <MaterialCommunityIcons name="bell" size={30} color="black" />
                        <Text style={styles.text}>Notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('CoursEleveStack')}>
                        <MaterialCommunityIcons name="karate" size={30} color="black" />
                        <Text style={styles.text}>Cours</Text>
                    </TouchableOpacity>
                </View>
            )}
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Profil')}>
                <Feather name="user" size={30} color="black" />
                <Text style={styles.text}>Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Logout')}>
                <FontAwesome5 name="door-open" size={20} color="black" />
                <Text style={styles.text2}>Déconnexion</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 50,
        marginTop: 100,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 20,
        marginLeft:-17,
    },
    text: {
        fontSize: 20,
        marginLeft: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 20
    },
    text2: {
        fontSize: 18,
        marginLeft: 10,


    }
});
