import { StyleSheet, Dimensions } from 'react-native'


const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
        paddingBottom: 60,
    },
    main: {
        display: "flex",
        marginTop: 5,
        marginHorizontal: 20,
    },
    topTitle: {
        paddingVertical: 5,
        fontSize: 20,
        fontWeight: "300",
        color: "rgba(0, 0, 0, 0.45)",  
    },
    imageBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        borderColor: "rgba(0, 0, 0, 0.10)",
        borderWidth: 1,
    },
    imageContainer: {
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    imageFile: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover",
    },
    description: {
        flex: 1,
        paddingVertical: 5,
    },
    titleProduct: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: "left",
        color: "rgba(0, 0, 0, 0.9)",
    },
    textDescription: {
        fontSize: 14,
        color: "rgba(0, 0, 0, 0.9)",
        textAlign: "left",
        marginTop: 8,
    },
    price: {
        fontSize: 16,
        color: "rgba(245, 62, 82, 0.6)",
        marginTop: 8,
    },
    details: {
        display: "flex",
        flexDirection: "column",
        marginTop: 10,
    },
    quantiteBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    totalBox: {
        flex: 1,
    },
    boutonAjouter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 45,
        borderRadius: 5,
        backgroundColor: "rgba(245, 62, 82, 0.6)",
        textAlign: "center",
        paddingVertical: 5,
        marginHorizontal: 30,
        marginTop: 20,  
    },
    sectionSliders: {
        marginTop: 20,
    },
    textTop: {
        fontSize: 24,
        fontWeight: '700',
        marginTop: 10,
    },
    boxSliders: {
        marginTop: 20,
    }
})

export default styles