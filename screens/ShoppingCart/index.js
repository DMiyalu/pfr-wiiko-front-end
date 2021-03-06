import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ShoppingCart from './ShoppingCart'
import Payment from './Payment'
import Service from './Service'
import SignIn from '../../components/User/signIn'
import SignUp from '../../components/User/signUp'
import SignUpStepTwo from '../../components/User/signUpStepTwo'


const Stack = createStackNavigator()
export class ShoppingCartEntry extends Component {
    render() {
        return (
                <NavigationContainer independent={true}>
                    <Stack.Navigator initialRouteName="ShoppingCart">
                        <Stack.Screen name="ShoppingCart" component={ShoppingCart} options={{ headerShown: false }} />
                        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: true }} />
                        <Stack.Screen name="Service" component={Service} options={{ headerShown: true }} />
                        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                        <Stack.Screen name="SignUpStepTwo" component={SignUpStepTwo} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
        )
    }
}

export default ShoppingCartEntry
