import React, { Dispatch, ReactNode, useEffect, useRef } from 'react'
import { View, Image, ActivityIndicator, TextInputProps, StyleSheet, Text } from 'react-native'
import { Common, Images } from '@/Theme'
import styles from './RegisterScreenStyles'
import animations from './RegisterScreenAnimation'
import { BasicButton, Field } from '@/Components'
import { useTranslation } from 'react-i18next'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Tools from '@/Tools/Tools'
import { connect } from "react-redux";
import { StoreState } from '@/Store/configureStore'
import { register, resetAuthError } from '@/ActionCreators/AuthActionCreator'
import * as Animatable from 'react-native-animatable'
import Toast from 'react-native-toast-message'
import { Colors } from '@/Theme'
import { navigateAndSimpleReset } from '@/Navigators/Root'

const RegisterScreen = (props: any) => {

    const {
        isLoading,
        error,
        dispatchRegister,
        dispatchResetAuthError
    } = props;

    // Run this, only when the component is mounted
    useEffect(() => {
        if (!isLoading && !error && email && password)
        {
            console.log("Register Success")
        }
    }, [isLoading])

    useEffect(() => {
        // Show the error message, only when we get one
        if (error)
        {
            Toast.show({
                type: 'error',
                text1: t('authentification.register_error'),
                text2: t('authentification.account_exist')
            })
            dispatchResetAuthError()
        }
    }, [error])

    const { t } = useTranslation();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [inputEmailError, setInputEmailError] = React.useState(false);
    const [inputPasswordError, setInputPasswordError] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(true);

    /**
     * @brief Check the syntax of the email when the user is typing
     */
    const onChangeEmail = (text: string) => {    
        setInputEmailError(!Tools.isEmail(text));
        setEmail(text);
    }

    /**
     * @brief Check the input of the password when the user finishes typing
     */
    const onChangePassword = (text: string) => {    
        setInputPasswordError(!Tools.isValidPass(text));
        setPassword(text);
    }

    /**
     * @brief Show a Toast Error if the email is incorrect
     */
    const onEndEditingEmail = () => {    
        if (inputEmailError)
        {
            Toast.show({
                type: 'error',
                text1: t('verification.email_title'),
                text2: t('verification.check_email'),
            });
        }
    }

    /**
     * @brief Show a Toast Error if the password is incorrect
     */
     const onEndEditingPassword = () => {    
        if (inputPasswordError)
        {
            Toast.show({
                type: 'error',
                text1: t('verification.password_title'),
                text2: t('verification.password_minimums'),
            });
        }
    }

    /**
     * @brief This function is called when we press on the register button.
     * It dispatch an 'AuthActionTypes/REGISTER' type.
     */
    const onClickToRegister = () => {
        dispatchRegister(email, password);
    }

    /**
     * @brief This function is called when we press on the no account button.
     * It navigate to login screen
     */
     const onPressIHaveAccount = () => {
        navigateAndSimpleReset("LoginScreen")
    }

    return (
        <View style={[Common.basicPage]}>

            <Image source={Images.loginBackground} style={styles.backgroundImage}/>
            
            {/* Content Container */}
            <Animatable.View style={styles.contentContainer} animation="slideInUp" duration={animations.DURATION}>
                
                {/* Title */}
                <Animatable.Text style={styles.title} animation="fadeIn" duration={200} delay={animations.DURATION}>
                    {t('authentification.registration')}
                </Animatable.Text>

                {/* Form */}
                <View style={styles.content}>
                    <View style={styles.fieldContainer}>

                        {/* Email Input */}
                        <Field
                            title={t('authentification.mail')}
                            containerStyle={styles.mailContainer}
                            onChangeText={onChangeEmail}
                            onEndEditing={onEndEditingEmail}
                            delay={animations.DURATION}
                            autoCompleteType={'email'}
                            keyboardType={'email-address'}
                            returnKeyType = {"next"}
                        />
                        
                        {/* Password Input */}
                        <Field
                            title={t('authentification.password')}
                            containerStyle={styles.passwordContainer}
                            onChangeText={onChangePassword}
                            onEndEditing={onEndEditingPassword}
                            delay={animations.DURATION * 2}
                            secureTextEntry={hidePassword}
                            returnKeyType = {"next"}

                        >
                            {/* Hide/Show password button */}
                            <TouchableOpacity
                                onPress={() => {setHidePassword(!hidePassword)}}
                                style={{ height: 25, width: 33 }}
                                containerStyle={{ position: 'absolute', right: 15 }}
                            >
                                <Animatable.Image animation="fadeIn" delay={animations.DURATION + 1500}
                                    source={Images.visibleText}
                                    style={[styles.hidePassword, hidePassword ? { tintColor: Colors.primary } : {}]}
                                />
                            </TouchableOpacity>
                        </Field>
                    </View>

                    <TouchableOpacity onPress={onPressIHaveAccount}>
                        <Animatable.Text
                            style={styles.haveAccountText}
                            animation="fadeIn" delay={animations.DURATION * 2 + 1200}>
                            {t('authentification.have_account')}
                        </Animatable.Text>
                    </TouchableOpacity>

                    <Animatable.View
                        style={styles.buttonContainer}
                        animation={animations.connectBtn}
                        duration={1000}
                        delay={animations.DURATION * 2 + 300}
                    >
                        { isLoading ?
                            <ActivityIndicator color={Colors.primary} size={50} />
                            :
                            <BasicButton
                                disabled={inputEmailError || inputPasswordError || !email || !password}
                                text={t('authentification.register')}
                                onPress={onClickToRegister}
                            />
                        }
                    </Animatable.View>
                </View>
            </Animatable.View>
        </View>
    );
}

const mapStateToProps = (state: StoreState) => {
    return state.auth;
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        dispatchRegister: (email: string, password: string) => dispatch(register(email, password)),
        dispatchResetAuthError: () => dispatch(resetAuthError()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
