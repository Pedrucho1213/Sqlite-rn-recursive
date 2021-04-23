import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SaveScreen from './pages/SaveScreen';
import ShowData from "./pages/ShowData";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SaveScreen'>
                <Stack.Screen
                    name='HomeScreen'
                    component={SaveScreen}
                    options={{
                        title: 'Pagina de inicio',
                        headerStyle: {
                            backgroundColor: '#221eeb',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name='ShowData'
                    component={ShowData}
                    options={{
                        title: 'Datos from DB',
                        headerStyle: {
                            backgroundColor: '#221eeb',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;