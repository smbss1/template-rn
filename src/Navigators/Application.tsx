import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '@/Navigators/Root'
import { StatusBar, View } from 'react-native'
import Layout from '@/Theme/Layout'
import MainNavigator from '@/Navigators/Main'
import NewsNavigator from '@/Navigators/News'
import Toast from 'react-native-toast-message'
import ToastConfig from '@/Config/Toast'
import { connect } from 'react-redux'
import { StoreState } from '@/Store/configureStore'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { StackNavigationOptions } from '@react-navigation/stack'

const Stack = createSharedElementStackNavigator()

const options: StackNavigationOptions = {
    cardStyleInterpolator: ({ current: { progress } }) => {
        return {
            cardStyle: {
                opacity: progress
            }
        };
    }
};

const ApplicationNavigator = (props: any) => {
    const { token } = props;

    return (
        <View style={Layout.fill}>
            <NavigationContainer ref={navigationRef}>
                <StatusBar barStyle={'dark-content'} />
                <Stack.Navigator headerMode={'none'}>
                { !token ?
                    // User is not login
                    <Stack.Screen
                        name="Main"
                        component={MainNavigator}
                        options={() => options}
                    />
                    :
                    // User is login
                    <Stack.Screen
                        name="News"
                        component={NewsNavigator}
                        options={() => options}
                    />
                }
                </Stack.Navigator>
            </NavigationContainer>
            <Toast config={ToastConfig}/>
        </View>
    )
}

const mapStateToProps = (state: StoreState) => {
    return state.auth;
};

export default connect(mapStateToProps, null)(ApplicationNavigator);