import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '@/Navigators/Root'
import { StatusBar, Text, View } from 'react-native'
import Layout from '@/Theme/Layout'
import MainNavigator from '@/Navigators/Main'
import HomeNavigator from '@/Navigators/Home'
import Toast from 'react-native-toast-message'
import ToastConfig from '@/Config/Toast'
import { connect } from 'react-redux'
import { StoreState } from '@/Store/configureStore'

const Stack = createStackNavigator()


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
                        options={{
                            animationEnabled: false,
                        }}
                    />
                    :
                    // User is login
                    <Stack.Screen
                        name="Home"
                        component={HomeNavigator}
                        options={{
                            animationEnabled: false,
                        }}
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