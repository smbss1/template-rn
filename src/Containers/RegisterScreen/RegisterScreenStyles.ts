import { StyleSheet } from 'react-native'
import Metrics from '@/Theme/Metrics'
import { Colors } from '@/Theme/Variables'
import Fonts from '@/Theme/FontsTypes'

export default StyleSheet.create({
    contentContainer: {
        width: Metrics.widthPercentageToDP('100%'),
        height: Metrics.heightPercentageToDP('80%'),
        paddingHorizontal: Metrics.paddingHorizontal,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
    },
    fieldContainer: {
        paddingBottom: Metrics.heightPercentageToDP('6%'),
    },
    buttonContainer: {
        paddingTop: Metrics.heightPercentageToDP('3%'),
    },
    content: {
        width: '100%',
        justifyContent: 'space-between',
        paddingTop: Metrics.heightPercentageToDP('5%'),
        paddingBottom: Metrics.isIphoneX()
            ? Metrics.heightPercentageToDP('5%')
            : Metrics.heightPercentageToDP('1%'),
    },
    backgroundImage: {
        width: Metrics.widthPercentageToDP('54%'),
        height: Metrics.heightPercentageToDP('29%'),
        resizeMode: 'contain',
        position: 'absolute',
        right: -9,
    },
    title: {
        fontFamily: Fonts.type.bold,
        fontSize: 26,
        width: '100%',
        textAlign: 'center',
        color: Colors.text,
        paddingTop: Metrics.heightPercentageToDP('3%'),
    },
    mailContainer: {
        marginTop: 37,
    },
    passwordContainer: {
        marginTop: 24,
    },
    haveAccountText: {
        marginTop: Metrics.heightPercentageToDP('3%'),
        marginBottom: 8,
        width: '100%',
        textAlign: 'center',
        fontSize: 19,
        fontFamily: Fonts.type.base,
        color: Colors.text,
        opacity: 0.7,
    },
    hidePassword: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    }
})
