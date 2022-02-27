import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NewsScreen } from '@/Containers'
import { NewsDetailsScreen } from '@/Containers'

const NewsStack = createStackNavigator()

const HomeNavigator = () => {
    return (
        <NewsStack.Navigator screenOptions={{ headerShown: false }}>
            <NewsStack.Screen name="NewsScreen" component={NewsScreen} />
            <NewsStack.Screen name="NewsDetailsScreen" component={NewsDetailsScreen} />
        </NewsStack.Navigator>
    )
}

export default HomeNavigator
