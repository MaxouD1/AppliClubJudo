import React, {useContext, useEffect} from "react";
import {View, Text, StyleSheet, Button, TouchableOpacity} from "react-native";
import axios from "axios";
import { AuthContext } from "../service/AuthContext";
import { FontAwesome5 } from '@expo/vector-icons';


const Profil = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const idUtilisateur = user ? user.id : null;
    const [data, setData] = React.useState([]);
    const [editMode, setEditMode] = React.useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://172.20.10.2:8000/api/judokas/${idUtilisateur}`);
                setData(response.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("La requête a été annulée", error.message);
                } else {
                    console.error("Erreur de requête API :", error);
                }
            }
        };

        fetchData();
    }, []);1

    const handleEdit = () => {
        if (editMode) {
            setEditMode( false)
        }
        setEditMode( true)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.header}>
                <FontAwesome5 name="user-circle" size={24} color="black" /> Profil Utilisateur
            </Text>
            <TouchableOpacity onPress={() => setEditMode(!editMode)}>
            </TouchableOpacity>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Nom:</Text>
                <Text style={styles.text}>{data.nom}</Text>

                <Text style={styles.label}>Prénom:</Text>
                <Text style={styles.text}>{data.prenom}</Text>

                <Text style={styles.label}>Mail :</Text>
                <Text style={styles.text}>{data.email}</Text>

                <Text style={styles.label}>Téléphone :</Text>
                <Text style={styles.text}>{data.tel}</Text>

                <Text style={styles.label}>Adresse :</Text>
                <Text style={styles.text}>{`${data.adresse}, ${data.ville}`}</Text>

                <Text style={styles.label}>Ville :</Text>
                <Text style={styles.text}>{data.ville}</Text>

                <Text style={styles.label}>Code Postal :</Text>
                <Text style={styles.text}>{data.codePostal}</Text>


                <Text style={styles.label}>Catégorie d'âge:</Text>
                <Text style={styles.text}>{data.categorieAge ? data.categorieAge.age : 'N/A'}</Text>

                <Text style={styles.label}>Catégorie de poids:</Text>
                <Text style={styles.text}>{data.categoriePoids ? data.categoriePoids.poids : 'N/A'}</Text>

                <Text style={styles.label}>Grade:</Text>
                <Text style={styles.text}>{data.grade ? data.grade.grade : 'N/A'}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 15,
    },
});

module.exports = Profil;