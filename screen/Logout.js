import React, {useContext, useEffect} from 'react';
import { View, Button } from 'react-native';
import { AuthContext } from '../service/AuthContext';
import { useNavigation } from "@react-navigation/native";

const Logout = () => {
    const { logout } = useContext(AuthContext);
    const navigation = useNavigation();

    const handleLogout = () => {
        logout();
        navigation.navigate('Login');
    };

    useEffect(() => {
        handleLogout();
    }, []);

    return (
        <View>
        </View>
    );
};

export default Logout;
