import React, { useEffect, useState, useContext } from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import { ButtonGroup, Button } from 'react-native-elements';
import { AuthContext } from '../service/AuthContext';
import { isAfter, parseISO } from 'date-fns';
import {useNavigation} from "@react-navigation/native";

const CoursEleve = () => {
    const [data, setData] = useState([]);
    const [selectedIndices, setSelectedIndices] = useState(Array(data.length).fill(0));
    const { user } = useContext(AuthContext);
    const idEleve = user ? user.id : null;
    const navigation = useNavigation();


    useEffect(() => {
        axios.get('http://172.20.10.2:8000/api/courss')
            .then(response => {
                setData(response.data['hydra:member']);
            })
            .catch(error => {
                console.error('Erreur de requête API', error);
            });
    }, []);

    const handleButtonPress = async (selectedIndex, index) => {
        try {
            const idCours = data[index].id;

            const response = await axios.post('http://172.20.10.2:8000/api/ajouter/participation', {
                idCours: idCours,
                idEleve: idEleve,
                confirmation: selectedIndex === 1,
            });

            console.log(response.data);

            setSelectedIndices(prevState => ({
                ...prevState,
                [index]: selectedIndex,
            }));
        } catch (error) {
            console.error('Erreur lors de la création de la participation', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    const today = new Date();

    const handleViewStudents = (coursId) => {
        navigation.navigate('ListeScreen', {coursId})
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.container}>
                {data.filter((item) => isAfter(parseISO(item.dateCours), today)).map((item, index) => (
                    <View key={item.id} style={styles.itemContainer}>
                        <Text style={styles.coursInfo}>
                            Le cours du {formatDate(item.dateCours)} maintenu : {item.maintient ? 'oui' : 'non'}
                        </Text>
                        <TouchableOpacity onPress={() => handleViewStudents(item.id)} style={styles.viewStudentsButton}>
                            <Text style={styles.viewStudentsButtonText}>Voir les élèves</Text>
                        </TouchableOpacity>
                        <ButtonGroup
                            onPress={(selectedIndex) => handleButtonPress(selectedIndex, index)}
                            selectedIndex={selectedIndices[index] !== undefined ? selectedIndices[index] : 0}
                            buttons={['Présent', 'Absent']}
                            buttonContainerStyle={{backgroundColor:'white'}}
                            selectedButtonStyle={{ backgroundColor: 'grey' }}
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};
const styles = {
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
    },
    container: {
        marginTop: 16,
    },
    itemContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    coursInfo: {
        fontSize: 16,
        marginBottom: 8,
    },

    viewStudentsButton: {
        marginTop: 10,
        padding: 8,
        backgroundColor: 'black',
        borderRadius: 5,
        alignItems: 'center',
    },
    viewStudentsButtonText: {
        color: 'white',
    },
};

export default CoursEleve;
