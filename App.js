import React, { useContext } from 'react';
import HomeScreen from './screen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profil from './screen/Profil';
import { Sidebar } from './component/Sidebar';
import EleveScreen from './screen/EleveScreen';
import CoursScreen from './screen/CoursScreen';
import Logout from "./screen/Logout";
import { createStackNavigator } from "@react-navigation/stack";
import DetailsEleve from "./screen/DetailsEleve";
import ListeScreen from "./screen/ListeScreen";
import {AuthContext, AuthProvider } from './service/AuthContext';
import Login from "./screen/Login";
import CreationCours from "./screen/CreationCours";
import NotificationScreen from "./screen/NotificationScreen";
import CoursEleve from "./screen/CoursEleve";
import Register from "./screen/Register";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CoursStack = () => {
    const { isAuthenticated, userRole } = useContext(AuthContext);


    return (
        <Stack.Navigator >
            <Stack.Screen name="CoursScreen" component={CoursScreen}  options={{title: 'Cours'}} />
            <Stack.Screen name="ListeScreen" component={ListeScreen}  options={{title: 'Liste des présences'}} />
            <Stack.Screen name={'CreationCours'} component={CreationCours}  options={{title: "Création d'un cours"}}/>
        </Stack.Navigator>
    );
}

const EleveStack = () => {
    return (
        <Stack.Navigator

        >
            <Stack.Screen name="EleveScreen" component={EleveScreen}  options={{title: 'Membre'}} />
            <Stack.Screen name="DetailsEleve" component={DetailsEleve}  options={{title: 'Détails membre'}}/>
        </Stack.Navigator>
    );
};

const CoursEleveStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CoursEleve" component={CoursEleve}  options={{title: 'Cours'}} />
            <Stack.Screen name="ListeScreen" component={ListeScreen}  options={{title: 'Liste des présences'}} />
        </Stack.Navigator>
    );
}

const App = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    let userArray = user ? user.role : null
    let userRole = userArray ? userArray[0] : null


    return (
        <NavigationContainer  >
            {isAuthenticated ? (
                <Drawer.Navigator
                    initialRouteName="HomeScreen"
                    drawerContent={(props) => <Sidebar {...props} userRole={userRole} />}
                >
                    <Drawer.Screen  name="HomeScreen" component={HomeScreen}  options={{title: 'Home'}}/>
                    <Drawer.Screen name="Profil" component={Profil}  options={{title: 'Profil'}}/>
                    <Drawer.Screen name="EleveStack" component={EleveStack} options={{title: 'Membre'}}/>
                    <Drawer.Screen name="CoursStack" component={CoursStack}  options={{title: 'Cours'}}/>
                    <Drawer.Screen name="Logout" component={Logout}/>
                    <Drawer.Screen name='NotificationScreen' component={NotificationScreen} options={{title: 'Notifications'}}/>
                    <Drawer.Screen name='CoursEleveStack' component={CoursEleveStack} options={{title: 'Cours'}}/>
                </Drawer.Navigator>
            ) : (
                <Stack.Navigator  screenOptions={{
                    headerShown: false,
                }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}

export default () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);
