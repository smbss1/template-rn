import { StyleSheet } from 'react-native'
import Metrics from '@/Theme/Metrics'
import { Colors } from '@/Theme'
import Fonts from '@/Theme/FontsTypes'

export default StyleSheet.create({
    card: {
        width: Metrics.widthPercentageToDP('90%'),
        height: Metrics.heightPercentageToDP('27%'),
        marginTop: 20,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10,
        resizeMode: 'cover'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor:'#1741658E',
        borderRadius: 10,
    },
    title: {
        width: '80%',
        fontFamily: Fonts.type.bold,
        fontSize: 18,
        color: Colors.white,
        textAlign: 'left',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 13,
        lineHeight: 21,
    },
    dateContainer: {
        width: Metrics.widthPercentageToDP('35%'),
        height: 25,
        borderRadius: 17,
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        top: 8,
    },
    dateBackground: {
        width: Metrics.widthPercentageToDP('35%'),
        height: 25,
        backgroundColor: '#071D2F',
        borderRadius: 17,
        opacity: 0.68,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    date: {
        textAlign: 'center',
        opacity: 1,
        color: Colors.white,
        fontFamily: Fonts.type.medium,
        fontSize: 11,
    },
})