import { StyleSheet } from 'react-native'
import Metrics from '@/Theme/Metrics'
import { Colors } from '@/Theme'
import Fonts from '@/Theme/FontsTypes'

export default StyleSheet.create({
    
    contentContainer: {
        paddingTop: 7,
        alignItems: 'center',
    },

    date: {
        fontFamily: Fonts.type.italic,
        fontSize: 15,
        textAlign: 'center',
        color: Colors.text
    },

    container: {
        paddingTop: 22,

        width: Metrics.widthPercentageToDP('95%'),
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        paddingHorizontal: 10,
    },

    shareContainer: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        // backgroundColor: 'green'
    },

    share: {
        fontFamily: Fonts.type.medium,
        fontSize: 16,
        textAlign: 'center',
        color: Colors.text
    },

    shareIcon: {
        marginRight: 13
    },

    card: {
        width: Metrics.widthPercentageToDP('90%'),
        height: Metrics.heightPercentageToDP('27%'),
        marginTop: 20,
        alignSelf: 'center'
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

    bodyContainer: {
        marginLeft: 12,
        alignSelf: "flex-start",
        justifyContent: 'space-between',
        marginTop: 51,
    },

    bodyTitleContainer: {
        width: Metrics.widthPercentageToDP('84%'),
        marginBottom: 41,
    },

    bodyTitle: {
        textAlign: 'left',
        fontSize: 16,
        fontFamily: Fonts.type.bold,
        color: Colors.text,
    },

    text: {
        textAlign: 'left',
        fontSize: 16,
        fontFamily: Fonts.type.base,
        lineHeight: 24,
        color: Colors.text,
        width: Metrics.widthPercentageToDP('87%'),
    }
})
