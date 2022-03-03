export { default as FieldAnimation } from '@/Components/Field/FieldAnimation'

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

export default {
    connectBtn,
    DURATION
}
