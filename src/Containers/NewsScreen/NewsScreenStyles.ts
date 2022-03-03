import { StyleSheet } from 'react-native'
import Metrics from '@/Theme/Metrics'

export default StyleSheet.create({
    cardContainer: {
        width: Metrics.widthPercentageToDP('100%'),
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: 30,
        flex: 1,
    },
})