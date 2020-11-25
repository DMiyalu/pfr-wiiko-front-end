import React, {  useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from 'react-native-paper'
import { getProduct } from '../../../Redux/Product/product.actions'
import { getProductList } from '../../../Redux/AllProduct/allProduct.actions'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CardProduct from '../../../components/CardProduct'
import axios from 'axios'
import { styles, getViewStyle } from './style'
import SearchResults from '../../../services/searchResults'
import { 
    Text,
    TextInput,
    View,  
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native'


const Home = ({ navigation }) => {
    const [dataSearchResults, setDataSearchResults] = useState([])
    const { products } = useSelector((state) => state.products)
    const [isLoading, setIsLoading] = useState(false)
    const [textSearch, setTextSearch] = useState("matembele")
    const [displayState, setDisplayState] = useState("none")
    const dispatch = useDispatch()


    //Affiche un rendu de chargement des données(loader 1)
    const showSmallEmptyCard = () => {
        return (
            <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.touchableOpacityStyle}
            >
                <View style={styles.smallEmptyCard}></View>
                <View style={styles.smallEmptyCard}></View>
                <View style={styles.smallEmptyCard}></View>
                <View style={styles.smallEmptyCard}></View>
            </ScrollView>
        )
    }


    //(Loader 2)
    const showBigEmptyCard = () => {
        return (
            <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.touchableOpacityStyle}
            >
                <View style={styles.bigEmptyCard}></View>
                <View style={styles.bigEmptyCard}></View>
                <View style={styles.bigEmptyCard}></View>
                <View style={styles.bigEmptyCard}></View>
            </ScrollView>
        )
    }


    //Affiche les produits dans la section des promotions produits
    const showPromotionnalProducts = (categorie) => {
        return (
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {(products.filter((product) => product.categorie === categorie)).map((product) => 
                    <TouchableOpacity
                        key={product._id}
                        style={styles.sectionImageBox}
                        onPress={() => {showOneProduct(product)}}
                    >
                        <Image style={styles.imageFile} source={product.image} />
                    </TouchableOpacity>
                )}
            </ScrollView>
        )
    }


    //Affiche les produits filtrés par leur catégorie
    const showAllProducts = (categorie) => {
        return (
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {(products.filter((product) => product.categorie === categorie)).map((product) => 
                    <TouchableOpacity
                        key={product._id}
                        style={styles.touchableOpacityStyle}
                        onPress={() => {showOneProduct(product)}}
                    >
                        <CardProduct
                            imageUri={product.image}
                            imageDescription={product.title.slice(0, 16)}
                            imagePrice={product.price}
                            unite={product.unite}
                        />
                    </TouchableOpacity>
                )}
            </ScrollView>
        )
    }
    

    // Affiche les détails sur un produit
    const showOneProduct = (product) => {
        dispatch(getProduct({
            productID: product.productID,
            title: product.title,
            description: product.description,
            price: product.price,
            number: product.number,
            image: product.image,
        }))
        navigation.navigate('Product')
    }


    //Rend visible la section des resultats d'une recherche
    const getSearchData = () => {
        setDisplayState("flex")
    } 


    //Recupère les données via l'API et les envoies vers le store
    useEffect(() => {
        axios
        .get('http://192.168.43.52:8080/product')
        .then(async(response) => {
            console.log("UseEffect start")
            console.log(response.data)
            await dispatch(getProductList(response.data))
        })
        .catch((error) => {
            console.log("Erreur à l'appel de l'api: ", error);
        })

        setIsLoading(true)
    }, [])
 

    return (
        <SafeAreaView style={styles.safeAreaViewStyle} >
        <StatusBar barStyle="light-content" backgroundColor="rgba(245, 62, 82, 0.6)" />
            <View style={styles.container} >
                <View style={styles.header}>
                    <View style={styles.searchBox}>
                        <MaterialCommunityIcons 
                            name="magnify" 
                            color="rgba(245, 62, 82, 0.6)" 
                            size={20} 
                            style={{ marginLeft: -4, marginRight: 10 }}
                            onPress={() => getSearchData()}
                        />
                        <TextInput
                            style={styles.textSearch}
                            placeholder="Recherche..."
                            placeholderTextColor="gray"
                            underlineColorAndroid="transparent"
                            clearTextOnFocus={false}
                            onChangeText={(value) => setTextSearch(value)}
                            onSubmitEditing={() => getSearchData()}
                        />
                    </View>
                    <View style={styles.accountBox}>
                        <Avatar.Image size={30} source={require('../../../assets/product/bananes.jpg')} />
                    </View>
                </View>

                <ScrollView
                    scrollEventThrottle={20}
                >
                    <View style={styles.mainSliders} >
                        <View style={getViewStyle(displayState)}>
                            <Text style={{ paddingHorizontal: 20, paddingBottom: 10 }}>Resultats pour le mot "{textSearch}"</Text>
                            <SearchResults />
                        </View>
                        <Text style={styles.textTop} >
                            Des légumes et des Viandes 100% Bio...
                        </Text>
                        <View style={styles.boxSliders} >
                            { (products.length === 0) ? showSmallEmptyCard() : showAllProducts("Légumes")}
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitre} >
                                    La patisserie à votre main !
                            </Text>
                            <Text style={styles.sectionCategories} >
                                Sandwich et autres Gateaux
                            </Text>
                            <View>
                                { (products.length === 0) ? showBigEmptyCard() : showPromotionnalProducts("Cake")}
                            </View>
                        </View>
                        <View style={styles.section} >
                            <Text style={styles.sectionTitre} >
                                Des boissons et des Jus 
                            </Text>
                            <Text style={styles.sectionCategories} >
                                Jus à base des fruits naturels
                            </Text>
                            <View style={styles.boxSliders} >
                                {(products.length === 0) ? showSmallEmptyCard() : showAllProducts("Boissons")}
                            </View>
                        </View>
                        <View style={styles.section} >
                            <Text style={styles.sectionTitre} >
                                Farine et Céréales
                            </Text>
                            <Text style={styles.sectionCategories} >
                                Céréales recoltés en bonne saison
                            </Text>
                            <View style={styles.boxSliders} >
                                {(products.length === 0) ? showSmallEmptyCard() : showAllProducts("Farine")}
                            </View>
                        </View>
                    </View> 
                </ScrollView>
            </View>
        </SafeAreaView>

    )
}

export default Home



