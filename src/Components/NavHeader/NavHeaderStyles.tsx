import { StyleSheet } from 'react-native'
import Metrics from '@/Theme/Metrics'
import { Colors } from '@/Theme'
import Fonts from '@/Theme/FontsTypes'

export default StyleSheet.create({
    headerContainer: {
        // width: Metrics.heightPercentageToDP("100%"),
        flexDirection: 'row',
        // backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    leftContainer: {
        paddingRight: 20
    },
    title: {
        fontFamily: Fonts.type.bold,
        fontSize: 26,
        textAlign: 'center',
        color: Colors.text,
    },
})