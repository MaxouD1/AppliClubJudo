import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../service/AuthContext';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import {decode} from "base-64"

const Login = () => {
    const { login, setAuthToken } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://172.20.10.2:8000/api/login_check", {
                username: email,
                password: motDePasse,
            });

            setAuthToken(response.data.token);
            login(response.data.user);
            navigation.navigate('HomeScreen');
        } catch (error) {
            console.error(error);
        }
    };

    const handleGoToRegister = async () => {
        navigation.navigate('Register');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connectez-Vous!</Text>
            <View style={styles.loginContainer}>
                <Text style={styles.text}>Adresse-mail</Text>
                <TextInput style={styles.input}
                    placeholder='Adresse mail'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <View style={styles.mdpContainer}>
                <Text style={styles.text}>Mot de passe</Text>
                <TextInput style={styles.input}
                    placeholder='Mot de passe'
                    secureTextEntry
                    value={motDePasse}
                    onChangeText={text => setMotDePasse(text)}
                />
            </View>
            <TouchableOpacity onPress={handleGoToRegister} style={styles.inscription}>
                <Text>Pas inscris ?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#fff',
    },
    title: {
        marginTop: -200,
        fontSize: 52,
        fontWeight: 'bold',
        marginBottom: 100,
    },
    loginContainer: {
        marginBottom: 20,
    },
    mdpContainer: {
        marginBottom: 40,
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        width: 350,
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 15,
    },

    button: {
        backgroundColor: 'black',
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    inscription: {
        marginBottom: 20,
    }
});

export default Login;
