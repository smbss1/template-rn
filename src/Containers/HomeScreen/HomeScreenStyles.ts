import { StyleSheet } from 'react-native'
import Metrics from '@/Theme/Metrics'
import { Colors } from '@/Theme'
import Fonts from '@/Theme/FontsTypes'

export default StyleSheet.create({
    cardContainer: {
        width: Metrics.widthPercentageToDP('100%'),
        // height: Metrics.heightPercentageToDP('100%'),
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: 30,
        flex: 1,
        // paddingBottom: 50
    },
    card: {
        width: Metrics.widthPercentageToDP('90%'),
        height: Metrics.heightPercentageToDP('27%'),
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: Colors.primary
    },
    cardImage: {
        flex: 1,
        alignSelf: 'stretch',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    cardTitle: {
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
    cardDateContainer: {
        width: Metrics.widthPercentageToDP('35%'),
        height: 25,
        borderRadius: 17,
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        top: 8,
    },
    cardDateBackground: {
        width: Metrics.widthPercentageToDP('35%'),
        height: 25,
        backgroundColor: '#071D2F',
        borderRadius: 17,
        opacity: 0.68,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    cardDate: {
        textAlign: 'center',
        opacity: 1,
        color: Colors.white,
        fontFamily: Fonts.type.medium,
        fontSize: 11,
    },
    titleContainer: {
        // width: '100%',
        justifyContent: 'center',
        // flexDirection: 'row'
    },
    title: {
        fontFamily: Fonts.type.bold,
        fontSize: 26,
        textAlign: 'center',
        color: Colors.text,
    },
    titleArrow: {
        // alignSelf: 'center',
        position: 'relative',
        left: 7,
        top: 0
    },
})
