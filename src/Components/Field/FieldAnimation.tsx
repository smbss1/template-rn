import { Colors } from "@/Theme";
import Tools from "@/Tools/Tools";

const fieldAnimationError = {
    0: {
        translateX: 0,
        borderWidth: 0,
        borderColor: Colors.error
    },
    0.1: {
        translateX: -10,
    },
    0.2: {
        translateX: 10,
    },
    0.3: {
        translateX: -10,
    },
    0.4: {
        translateX: 10,
    },
    0.5: {
        translateX: -10,
    },
    0.6: {
        translateX: 10,
    },
    0.7: {
        translateX: -10,
    },
    0.8: {
        translateX: 10,
    },
    0.9: {
        translateX: -10,
    },
    1: {
        translateX: 0,
        borderWidth: 2,
        borderColor: Colors.error
    },
};

const fieldAnimationResetError = {
    0: {
        borderWidth: 0,
    },
    1: {
        borderWidth: 0,
    },
};

export default {
    fieldAnimationError,
    fieldAnimationResetError
}