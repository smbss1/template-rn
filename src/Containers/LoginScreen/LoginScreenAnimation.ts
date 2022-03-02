import { StyleSheet } from 'react-native'
import Metrics from '@/Theme/Metrics'
import { Colors } from '@/Theme/Variables'
import Fonts from '@/Theme/FontsTypes'

const DURATION = 400;

const connectBtn = {
    0: {
        transform: [
            {
                translateY: 150
            }
        ],
        opacity: 0
    },
    1: {
        transform: [
            {
                translateY: 0
            }
        ],
        opacity: 1
    },
};

const inputTitle = {
    0: {
        transform: [
            {
                translateY: -20
            }
        ],
        opacity: 0
    },
    1: {
        transform: [
            {
                translateY: 0
            }
        ],
        opacity: 0.4
    },
};

export default {
    connectBtn,
    inputTitle,
    DURATION
}
