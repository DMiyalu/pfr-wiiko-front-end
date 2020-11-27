import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')


export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: height,
        width: width,
        backgroundColor: '#aaa'
    }
})