import React, {useEffect, useState} from "react";
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import { Input } from "react-native-elements";
import RadioGroup, { RadioButton } from "react-native-radio-buttons-group";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from 'react-native-select-dropdown'
import axios from "axios";

const Register = () => {
    const [step, setStep] = useState(0);
    const ceinture = ["Blanche", "Jaune", "Orange", "Verte", "Bleue", "Marron", "Noire", "Blanche et Rouge"];
    const [isFormValid, setIsFormValid] = useState(false);
    const categorieAge = ["Benjamin", "Minime", "Cadet", "Junior", "Senior"]
    const categoriePoids = ["-60/48", "-66/52" ,"-73/57", "-81/63", "-90/70", "-100/78", "+100/+78"]
    const [selectCategorieAge, setSelectCatAge] = useState(0);
    const [selectCategoriePoids, setSelectCatPoids] = useState(0);
    const [selectCeinture, setSelecteCeinture] = useState(0);
    const navigation = useNavigation();
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        roles: [],
        nom: "",
        prenom: "",
        tel: "",
        adresse: "",
        codePostal: "",
        ville: "",
        civilite: "",
    });
    const radioButtons = [
        {
            id: "1",
            label: "Homme",
            value: 1,
        },
        {
            id: "2",
            label: "Femme",
            value: 2,
        },
    ];
    const [selectedId, setSelectedId] = useState();

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleBackLogin = () => {
        navigation.navigate("Login");
    };

    const handleSelectedCivility = () => {
        setRegisterData({ ...registerData, civilite: selectedId });
    }

    const handleRegister = async () => {

        try {
            let postData = {};
            postData = {
                email: registerData.email,
                password: registerData.password,
                roles: [""],
                nom: registerData.nom,
                prenom: registerData.prenom,
                tel: registerData.tel,
                adresse: registerData.adresse,
                codePostal: registerData.codePostal,
                ville: registerData.ville,
                civilite: registerData.civilite,
                ceinture: selectCeinture,
                categorieAge: selectCategorieAge,
                categoriePoids:selectCategoriePoids,
            };
            const response = await axios.post("http://172.20.10.2:8000/api/register", postData);
            navigation.navigate('Login');
        }
        catch (error) {
            console.error("Error during registration:", error);
        }
    }
    const isStepOneValid = () => {
        return registerData.email !== "" && registerData.password !== "";
    };

    const isStepTwoValid = () => {
        return (
            registerData.nom !== "" &&
            registerData.prenom !== "" &&
            registerData.tel !== "" &&
            registerData.adresse !== "" &&
            registerData.ville !== "" &&
            registerData.codePostal !== "" &&
            selectedId !== undefined
        );
    };

    const isStepThreeValid = () => {
        return selectCategorieAge !== 0 && selectCategoriePoids !== 0 && selectCeinture !== 0;
    };

    useEffect(() => {
        handleSelectedCivility();
    }, [selectedId]);

    useEffect(() => {
        if (step === 0) {
            setIsFormValid(isStepOneValid());
        } else if (step === 1) {
            setIsFormValid(isStepTwoValid());
        } else {
            setIsFormValid(isStepThreeValid());
        }
    }, [step, registerData, selectedId, selectCategorieAge, selectCategoriePoids, selectCeinture]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {step === 0 ? (
                <>
                    <TouchableOpacity onPress={handleBackLogin} style={styles.backButton}>
                        <Text style={styles.backButtonText}>Retour</Text>
                    </TouchableOpacity>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Adresse-mail :</Text>
                        <Input
                            value={registerData.email}
                            onChangeText={(text) => setRegisterData({ ...registerData, email: text })}
                            style={styles.input}
                            inputStyle={styles.inputText}
                        />
                        <Text style={styles.label}>Mot de passe :</Text>
                        <Input
                            value={registerData.password}
                            onChangeText={(text) => setRegisterData({ ...registerData, password: text })}
                            style={styles.input}
                            inputStyle={styles.inputText}
                            secureTextEntry
                        />
                        <TouchableOpacity
                            onPress={handleNext}
                            style={[styles.nextButton, { backgroundColor: isFormValid ? "#333333" : "#999999" }]}
                            disabled={!isFormValid}
                        >
                            <Text style={styles.buttonText}>Continuer</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : step ===1 ? (
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Nom :</Text>
                    <Input
                        value={registerData.nom}
                        onChangeText={(text) => setRegisterData({ ...registerData, nom: text })}
                        style={styles.input}
                        inputStyle={styles.inputText}
                    />
                    <Text style={styles.label}>Prénom :</Text>
                    <Input
                        value={registerData.prenom}
                        onChangeText={(text) => setRegisterData({ ...registerData, prenom: text })}
                        style={styles.input}
                        inputStyle={styles.inputText}
                    />
                    <Text style={styles.label}>Téléphone :</Text>
                    <Input
                        value={registerData.tel}
                        onChangeText={(text) => setRegisterData({ ...registerData, tel: text })}
                        style={styles.input}
                        inputStyle={styles.inputText}
                    />
                    <Text style={styles.label}>Civilité :</Text>
                    <RadioGroup
                        radioButtons={radioButtons}
                        selectedId={selectedId}
                        onPress={setSelectedId}

                    />
                    <Text style={styles.label}>Adresse :</Text>
                    <Input
                        value={registerData.adresse}
                        onChangeText={(text) => setRegisterData({ ...registerData, adresse: text })}
                        style={styles.input}
                        inputStyle={styles.inputText}
                    />
                    <Text style={styles.label}>Ville :</Text>
                    <Input
                        value={registerData.ville}
                        onChangeText={(text) => setRegisterData({ ...registerData, ville: text })}
                        style={styles.input}
                        inputStyle={styles.inputText}
                    />
                    <Text style={styles.label}>Code Postal :</Text>
                    <Input
                        value={registerData.codePostal}
                        onChangeText={(text) => setRegisterData({ ...registerData, codePostal: text })}
                        style={styles.input}
                        inputStyle={styles.inputText}
                    />
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Text style={styles.backButtonText}>Retour</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleNext}
                        style={[styles.nextButton, { backgroundColor: isFormValid ? "#333333" : "#999999" }]}
                        disabled={!isFormValid}
                    >
                        <Text style={styles.buttonText}>Continuer</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.formContainer}>
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.labelText}>Sélectionner une ceinture :</Text>
                        <SelectDropdown
                            data={ceinture}
                            onSelect={(selectedItem) => setSelecteCeinture(ceinture.indexOf(selectedItem) + 1)}
                            buttonTextAfterSelection={(selectedItem) => selectedItem}
                            rowTextForSelection={(item) => item}
                        />
                    </View>

                    <View style={styles.dropdownContainer}>
                        <Text style={styles.labelText}>Sélectionner une catégorie d'âge :</Text>
                        <SelectDropdown
                            data={categorieAge}
                            onSelect={(selectedItem) => setSelectCatAge(categorieAge.indexOf(selectedItem) + 1)}
                            buttonTextAfterSelection={(selectedItem) => selectedItem}
                            rowTextForSelection={(item) => item}
                        />
                    </View>

                    <View style={styles.dropdownContainer}>
                        <Text style={styles.labelText}>Sélectionner une catégorie de poids :</Text>
                        <SelectDropdown
                            data={categoriePoids}
                            onSelect={(selectedItem) => setSelectCatPoids(categoriePoids.indexOf(selectedItem) + 1)}
                            buttonTextAfterSelection={(selectedItem) => selectedItem}
                            rowTextForSelection={(item) => item}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleRegister}
                        style={[styles.nextButton, { backgroundColor: isFormValid ? "#333333" : "#999999" }]}
                        disabled={!isFormValid}
                    >
                        <Text style={styles.buttonText}>Valider</Text>
                    </TouchableOpacity>
                </View>
                )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    formContainer: {
        width: "100%",
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 10,
        elevation: 2,
    },
    label: {
        fontSize: 18,
        marginTop: 10,
        color: "#333333",
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        borderColor: "#cccccc",
    },
    inputText: {
        color: "#333333",
    },
    backButton: {
        alignSelf: "flex-start",
        marginTop: 20,
    },
    backButtonText: {
        color: "#333333",
        fontSize: 16,
    },
    nextButton: {
        backgroundColor: "#333333",
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
    },
    selectedCivilityIndicator: {
        fontSize: 16,
        marginTop: 10,
        color: "#333333",
    },
    dropdownContainer: {
        marginBottom: 20,
        width: '100%',
    },
    labelText: {
        fontSize: 16,
        marginBottom: 8,
    },
});

export default Register;
