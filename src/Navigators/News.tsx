import React from 'react'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { NewsScreen } from '@/Containers'
import { NewsDetailsScreen } from '@/Containers'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'

const NewsStack = createSharedElementStackNavigator()

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
            animation: "timing", config: {duration: 300 }
        },
        close: {
            animation: "timing", config: {duration: 150 }
        }
    }
};

const NewsNavigator = () => {
    return (
        <NewsStack.Navigator screenOptions={{ headerShown: false }}>
            <NewsStack.Screen name="NewsScreen" component={NewsScreen} />
            <NewsStack.Screen name="NewsDetailsScreen" component={NewsDetailsScreen} options={() => options} />
        </NewsStack.Navigator>
    )
}

export default NewsNavigator
