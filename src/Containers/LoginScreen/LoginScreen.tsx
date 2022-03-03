import React, { Dispatch, useEffect } from 'react'
import { View, Image, ActivityIndicator, ViewStyle, ViewProps } from 'react-native'
import { Common, Images } from '@/Theme'
import styles from './LoginScreenStyles'
import animations, { FieldAnimation } from './LoginScreenAnimation'
import { BasicButton, Field } from '@/Components'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Tools from '@/Tools/Tools'
import { connect } from "react-redux";
import { StoreState } from '@/Store/configureStore'
import { login, refreshTokenAction, resetAuthState } from '@/ActionCreators/AuthActionCreator'
import * as Animatable from 'react-native-animatable'
import Toast from 'react-native-toast-message'
import { Colors } from '@/Theme'
import EncryptedStorage from 'react-native-encrypted-storage';
import { navigateAndSimpleReset } from '@/Navigators/Root'
import { useRef } from 'react'
import { createRef } from 'react'

const LoginScreen = (props: any) => {

    const {
        isLoading,
        error,
        dispatchLogin,
        dispatchRefreshToken,
        dispatchResetAuthState
    } = props;

    // Run this, only when the component is mounted
    useEffect(() => {
        // If we login previously, so try to get a new token
        EncryptedStorage.getItem("refreshToken")
            .then((refreshToken) => {

                if (refreshToken)
                {
                    dispatchRefreshToken(refreshToken);
                }
            })
    }, [])

    useEffect(() => {
        // Show the error message, only when we get one
        if (error)
        {
            Toast.show({
                type: 'error',
                text1: t('authentification.login_error'),
            })
            dispatchResetAuthState();
        }
    }, [error])

    const { t } = useTranslation();
    const [email, setEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [inputEmailError, setInputEmailError] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(true);

    const emailAnimationRef = createRef<any>()

    /**
     * @brief Check the syntax of the email when the user is typing
     */
     const onChangeEmail = (text: string) => {    
        setInputEmailError(!Tools.isEmail(text));
        setEmail(text);
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

            emailAnimationRef.current?.animate(FieldAnimation.fieldAnimationError, 300);
        }
        else
        {
            emailAnimationRef.current?.animate(FieldAnimation.fieldAnimationResetError, 300);
        }
    }

    /**
     * @brief This function is called when we press on the login button.
     * It dispatch an 'AuthActionTypes/LOGIN' type.
     */
    const onClickToLogin = () => {
        dispatchLogin(email, password);
    }

    /**
     * @brief This function is called when we press on the no account button.
     * It navigate to register screen
     */
    const onPressNoAccount = () => {
        navigateAndSimpleReset("RegisterScreen")
    }

    return (
        <View style={[Common.basicPage]}>

            <Image source={Images.loginBackground} style={styles.backgroundImage}/>
            
            {/* Content Container */}
            <Animatable.View style={styles.contentContainer} animation="slideInUp" duration={animations.DURATION}>
                
                {/* Title */}
                <Animatable.Text style={styles.title} animation="fadeIn" duration={200} delay={animations.DURATION}>
                    {t('authentification.connection')}
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
                            returnKeyType={"next"}
                            animationRef={emailAnimationRef}
                        />
                        
                        {/* Password Input */}
                        <Field
                            title={t('authentification.password')}
                            containerStyle={styles.passwordContainer}
                            onChangeText={onChangePassword}
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

                    {/* No Account Text */}
                    <TouchableOpacity onPress={onPressNoAccount}>
                        <Animatable.Text
                            style={styles.noAccountText}
                            animation="fadeIn" delay={animations.DURATION * 2 + 1200}>
                            {t('authentification.no_account')}
                        </Animatable.Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <Animatable.View
                        style={styles.buttonContainer}
                        animation={animations.btnEntryAnimation}
                        duration={1000}
                        delay={animations.DURATION * 2 + 300}
                    >
                        { isLoading ?
                            <ActivityIndicator color={Colors.primary} size={50} />
                            :
                            <BasicButton
                                disabled={inputEmailError || !email || !password}
                                text={t('authentification.connect')}
                                onPress={onClickToLogin}
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
        dispatchLogin: (email: string, password: string) => dispatch(login(email, password)),
        dispatchRefreshToken: (refreshToken: string) => dispatch(refreshTokenAction(refreshToken)),
        dispatchResetAuthState: () => dispatch(resetAuthState()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
