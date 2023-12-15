import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const DetailsScreen = () => {
    const [eleve, setEleve] = useState([]);
    const [searchData, setSearchData] = useState({
        dateDebut: Date.now(),
        dateFin: Date.now(),
    });
    const [assiduite, setAssiduite] = useState({
        present: 0,
        absent: 0,
    });
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);


    const route = useRoute();
    const { eleveId } = route.params;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://172.20.10.2:8000/api/judokas/${eleveId}`);
                setEleve(response.data);
                const response2 = await axios.post(`http://172.20.10.2:8000/api/assiduite/${eleveId}`);
                setAssiduite(response2.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('La requête a été annulée', error.message);
                } else {
                    console.error('Erreur de requête API :', error);
                }
            }
        };

        fetchData();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await axios.post('http://172.20.10.2:8000/calculer/assiduite', {
                idEleve: eleveId,
                ...searchData,
            });
            setAssiduite(response.data);
        } catch (error) {
            console.error("Erreur lors de la recherche d'assiduité :", error);
        }
    };

    const handleStartDateChange = (event, selectedDate) => {
        setShowStartDatePicker(false);
        if (selectedDate !== undefined && !isNaN(selectedDate.getTime())) {
            setSearchData({ ...searchData, dateDebut: selectedDate });
        }
    };

    const handleEndDateChange = (event, selectedDate) => {
        setShowEndDatePicker(false);
        if (selectedDate !== undefined && !isNaN(selectedDate.getTime())) {
            setSearchData({ ...searchData, dateFin: selectedDate || searchData.dateFin });
        }
    };

    return (
        <View style={styles.container}>
        <Text styles={styles.title}>Détails de l'élève</Text>
        <View style={styles.container2}>
            <Text style={styles.text}>Nom: {eleve.nom}</Text>
            <Text style={styles.text}>Prénom: {eleve.prenom}</Text>
            <Text style={styles.text}>Catégorie d'âge: {eleve.categorieAge ? eleve.categorieAge.age : 'N/A'}</Text>
            <Text style={styles.text}>Catégorie de poids: {eleve.categoriePoids ? eleve.categoriePoids.poids : 'N/A'}</Text>
            <Text style={styles.text}>Ceinture: {eleve.grade ? eleve.grade.grade : 'N/A'}</Text>
        </View>
            <View style={styles.container3}>
                <Text styles={styles.title2}>Assiduité de l'élève</Text>
                <View style={styles.container2}>
                    <Text style={styles.text}>
                        Présence totale: {assiduite.present}
                    </Text>
                    <Text style={styles.text}>
                        Absence totale: {assiduite.absent}
                    </Text>
                    <View style={styles.datePickerContainer}>
                        <View style={styles.datePickerRow}>
                            <Text style={styles.datePickerLabel}>Date de début : </Text>
                            <TouchableOpacity style={styles.datePickerTouchable} onPress={() => setShowStartDatePicker(true)}>
                                <Text style={styles.datePickerText}>{format(new Date(searchData.dateDebut), 'dd/MM/yyyy', { locale: fr })}</Text>
                            </TouchableOpacity>
                            {showStartDatePicker && (
                                <DateTimePicker
                                    value={new Date(searchData.dateDebut)}
                                    mode="date"
                                    display="spinner"
                                    onChange={handleStartDateChange}
                                />
                            )}
                        </View>
                        <View style={styles.datePickerRow}>
                            <Text style={styles.datePickerLabel}>Date de fin : </Text>
                            <TouchableOpacity style={styles.datePickerTouchable} onPress={() => setShowEndDatePicker(true)}>
                                <Text style={styles.datePickerText}>{format(new Date(searchData.dateFin), 'dd/MM/yyyy', { locale: fr })}</Text>
                            </TouchableOpacity>
                            {showEndDatePicker && (
                                <DateTimePicker
                                    value={new Date(searchData.dateFin)}
                                    mode="date"
                                    display="spinner"
                                    onChange={handleEndDateChange}
                                />
                            )}
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSearch}
                    >
                        <Text style={styles.buttonText}>Rechercher</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',},
    container2: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        elevation: 3,},
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,},
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,},
    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,},
    button: {
        height: 50,
        width: 200,
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    container3: {
        marginTop: 70,
    },
    datePickerContainer: {
        marginTop: 10,
    },
    datePickerRow: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
    },
    datePickerLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    datePickerTouchable: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
    },
    datePickerText: {
        fontSize: 16,
    },
});

export default DetailsScreen;