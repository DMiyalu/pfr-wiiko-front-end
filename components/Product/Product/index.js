import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPanier } from '../../../Redux/Panier/panier.actions'
import styles from './style'
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar } from 'react-native-paper'
import { 
    Text, 
    View,  
    Image,
    SafeAreaView, 
    StatusBar,
    Picker,
    TextInput,
    ScrollView, 
    TouchableOpacity,
    Alert
} from 'react-native'


const listValueCount = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
 
    const Product = ({ route, navigation }) => {
        const dispatch = useDispatch()
        const { product } = useSelector((state) => state.product)
        const { panier } = useSelector((state) => state.panier)
        const [count, setCount] = useState(1)
        let newProduct = {...product}


        const setCountProduct = (data) => {
            newProduct.number = data
            setCount(data)
        }


        const createAlertButton = () => {
            Alert.alert(
                'Ajout article',
                'Cet article est déjà dans le panier !',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Action annulée !'),
                        style: 'cancel'
                    }
                ],
                {cancelable: false}
            )
        }

        const testProductExistAlready = () => {

            for (let element of panier.listFruits) {
                if (newProduct.productID === element.productID) return true
                else continue
            }
            return false
        }

        const callValidation = async () => {
            await  
            (testProductExistAlready()) ? createAlertButton() : addToShoppingCart()
        }
 
        const addToShoppingCart = async () => {
            // set count product
            newProduct.number = count

            let newState = { ...panier }
            await newState.listFruits.push(newProduct)

            // set new total and netToPay
            newState.total += (newProduct.price * newProduct.number)
            
            console.log('newState: ', newState)
            dispatch(getPanier(newState))
        }

        return (
            <SafeAreaView style={styles.container}>
            <ScrollView scrollEventThrottle={20} showsVerticalScrollIndicator={false} >
                <View style={styles.main} >
                    <View style={styles.header}> 
                        <View style={styles.returnIcon}>
                            <MaterialCommunityIcons 
                                name="menu-left" 
                                color="white" 
                                size={35} 
                                style={{ position: 'relative', left: 0, marginLeft: 0 }}
                                onPress={() => navigation.goBack()}
                            />
                        </View>
                        <View style={styles.accountBox}>
                            <Avatar.Image style={styles.accountIcon} size={24} source={require('../../../assets/product/bananes.jpg')} />
                        </View>
                    </View>
                    <View style={styles.imageBox} >
                        <Image style={styles.imageFile} source={product.image} />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.topTitle}>{product.title}</Text>
                        <Text style={styles.line}></Text>
                        <Text style={styles.description}>{product.description}</Text>
                        <Text style={styles.price}>Prix: {product.price} Fc/ {product.unite}</Text>
                        <Text style={styles.price}>TVA: 0.0 Fc</Text>
                        <View style={styles.totalEtQuantite}>
                            <View style={styles.totalBox}>
                                <Text style={styles.totalTitle}>Total:</Text>
                                <Text style={styles.totalValue}>{product.price * count} Fc</Text>
                            </View>
                            <View style={styles.quantiteBox}>
                                <Text style={styles.totalTitle}>Quantite:</Text>
                                <View style={styles.setCount}>
                                    <TouchableOpacity
                                        style={styles.sign}
                                        onPress={() => {
                                            if (count > 1) setCount(count - 1)
                                        }}
                                    >
                                        -
                                    </TouchableOpacity>
                                    <TextInput 
                                        placeholder={count} 
                                        style={styles.input}
                                        underlineColorAndroid="gray"
                                        selectionColor="blue"
                                        maxLength={3}
                                        keyboardType='numeric'
                                        onChangeText={(value) => setCount(value)}
                                    />
                                    <TouchableOpacity
                                        style={styles.sign}
                                        onPress={() => setCount(count + 1)}
                                    >
                                        +
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => callValidation()}
                            style={styles.boutonAjouter}
                        >
                            <Text style={{ color: "white", fontSize: 16, fontWeight: '600' }}>Ajouter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            </SafeAreaView>
        )
    }


export default Product
