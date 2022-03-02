import { StyleSheet } from 'react-native'
import Metrics from '@/Theme/Metrics'
import { Colors } from '@/Theme'
import Fonts from '@/Theme/FontsTypes'

export default StyleSheet.create({
    input: {
        width: Metrics.widthPercentageToDP("90%"),
        height: Metrics.buttonHeight,
        backgroundColor: Colors.white,
        paddingLeft: 20,
        borderRadius: Metrics.buttonRadius,
        fontSize: 16,
        fontFamily: Fonts.type.light,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        fontFamily: Fonts.type.medium,
        fontSize: 14,
        color: Colors.text,
        opacity: 0.4,
        marginBottom: 10,
    },
})