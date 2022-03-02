
import { Animations } from '@/Theme'

const defaultLottieOptions = {
    loop: true,
    autoplay: true, 
    animationData: Animations.loading,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

export default {
    defaultLottieOptions
}