import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Input } from "react-native-elements";
import SelectDropdown from 'react-native-select-dropdown'
import RadioGroup, { RadioButton } from 'react-native-radio-buttons-group';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";

const CreationCours = ({ navigation }) => {
    const joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] = useState("");
    const [selectedRecurrence, setSelectedRecurrence] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedId, setSelectedId] = useState();
    const radioButtons = useMemo(() => ([
        {
            id: '1',
            label: 'Récurrent',
            value: 1
        },
        {
            id: '2',
            label: 'Non Récurrent',
            value: 2
        }
    ]), []);

    const handleCreateCours = async () => {
        try {
            const response = await axios.post("http://172.20.10.2:8000/api/creer_cours", {
                jour: selectedDay,
                recurrence: selectedRecurrence,
                heure: selectedHour,
                date: startDate.toISOString().split('T')[0],
                dateDebut: startDate.toISOString().split('T')[0],
                dateFin: endDate.toISOString().split('T')[0],
            });


        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.title}>Créer un cours</Text>

            <View style={styles.inputContainer}>
                <Text>Sélectionner un jour</Text>
                <SelectDropdown
                    data={joursSemaine}
                    onSelect={(selectedItem) => setSelectedDay(joursSemaine.indexOf(selectedItem) + 1)}
                    buttonTextAfterSelection={(selectedItem) => selectedItem}
                    rowTextForSelection={(item) => item}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Sélectionner une heure</Text>
                <Input
                    onChangeText={(inputValue) => setSelectedHour(inputValue)}
                    style={styles.input}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Sélectionner une récurrence</Text>
                {radioButtons.map((button) => (
                    <View key={button.id} style={styles.radioButtonContainer}>
                        <RadioButton
                            value={button.value}
                            status={selectedRecurrence === button.value ? 'checked' : 'unchecked'}
                            onPress={() => setSelectedRecurrence(button.value)}
                            selectedId={selectedRecurrence}
                       />
                        <Text>{button.label}</Text>
                    </View>
                ))}

                {selectedRecurrence === 1 && (
                    <View style={styles.datePickerContainer}>
                        <Text>Préciser la date de début :</Text>
                        <DateTimePicker
                            value={startDate}
                            mode="date"
                            display="spinner"
                            onChange={(event, selectedDate) => setStartDate(selectedDate || startDate)}
                        />
                        <Text>Préciser la date de fin :</Text>
                        <DateTimePicker
                            value={endDate}
                            mode="date"
                            display="spinner"
                            onChange={(event, selectedDate) => setEndDate(selectedDate || endDate)}
                        />
                    </View>
                )}

                {selectedRecurrence === 2 && (
                    <View style={styles.datePickerContainer}>
                        <Text>Préciser la date :</Text>
                        <DateTimePicker
                            value={startDate}
                            mode="date"
                            display="spinner"
                            onChange={(event, selectedDate) => setStartDate(selectedDate || startDate)}
                        />
                    </View>
                )}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleCreateCours}>
                <Text style={styles.buttonText}>Créer le cours</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    datePickerContainer: {
        marginTop: 10,
    },
    button: {
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
});

export default CreationCours;
