import { StyleSheet } from 'react-native'
import Metrics from '@/Theme/Metrics'
import { Colors } from '@/Theme/Variables'
import Fonts from '@/Theme/FontsTypes'

export default StyleSheet.create({
    cardContainer: {
        width: Metrics.widthPercentageToDP('100%'),
        height: Metrics.heightPercentageToDP('100%'),
        // paddingHorizontal: Metrics.paddingHorizontal,
        alignItems: 'center',
        // justifyContent: 'center',
        alignSelf: 'center'
        // position: 'absolute',
        // bottom: 0,
    },
    card: {
        width: Metrics.widthPercentageToDP('90%'),
        height: Metrics.heightPercentageToDP('30%'),
        // justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderRadius: 10,
    },
    basicPage: {
        flex: 1,
        paddingTop: Metrics.isIphoneX() ? 60 : 40,
        backgroundColor: Colors.background,
    },
    titleContainer: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    title: {
        fontFamily: Fonts.type.bold,
        fontSize: 26,
        flexGrow: 0.95,
        textAlign: 'center',
        color: Colors.text,
        paddingRight: '5%'
    },
    titleArrow: {
        justifyContent: 'flex-start',
        marginTop: 11
        // left: 6,
    },
})
