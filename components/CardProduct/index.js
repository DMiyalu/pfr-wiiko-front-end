import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'


    const CardProduct = (props) => {

        return (
            <View 
                style={styles.sliderItem}
            >
                <View style={styles.imageBox} >
                    <Image 
                        source={props.imageUri} 
                        style={styles.imageFile}
                    />
                </View>
                <View style={styles.imageTextDescription} >
                    <View>
                        <Text style={styles.imageDescription} >
                            {props.imageDescription}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.imagePrice} >
                            {props.imagePrice} $ par unité.
                        </Text>
                    </View>  
                </View>
            </View>
        )
    }


export default CardProduct

const styles = StyleSheet.create({
    sliderItem: {
        height: 130,
        width: 130,
        marginLeft: 20,
        borderWidth: 0.5,
        borderColor: "#dddddd",
    },
    imageBox: {
        flex: 2,
    },
    imageTextDescription: {
        display: "flex",
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    imageFile: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover",
    },
    imageDescription: {
        fontWeight: '500',
        fontSize: 14,
        color: "rgba(0, 0, 0, 0.8) ",
    },
    imagePrice: {
        fontWeight: '500',
        color: "rgba(245, 62, 82, 0.6)",
        fontSize: 15,
    }
});