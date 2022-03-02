import React from 'react'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { LoginScreen } from '@/Containers'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'

// const LoginStack = createStackNavigator()
const LoginStack = createSharedElementStackNavigator()

const options: StackNavigationOptions = {
    gestureEnabled: false,
    cardStyleInterpolator: ({ current: { progress } }) => {
        return {
            cardStyle: {
                opacity: progress
            }
        };
    },
    transitionSpec: {
        open: {
            animation: "timing", config: {duration: 1000 }
        },
        close: {
            animation: "timing", config: {duration: 1000 }
        }
    }
};

const MainNavigator = () => {
    return (
        <LoginStack.Navigator screenOptions={{ headerShown: false }}>
            <LoginStack.Screen name="LoginScreen" component={LoginScreen} options={() => options} />
        </LoginStack.Navigator>
    )
}

export default MainNavigator
