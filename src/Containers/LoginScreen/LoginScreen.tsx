import React, { Dispatch, useEffect, useRef } from 'react'
import { View, Text, Image, ActivityIndicator, TextInputProps } from 'react-native'
import { Common, Images } from '@/Theme'
import styles from './LoginScreenStyles'
import animations from './LoginScreenAnimation'
import { BasicButton } from '@/Components'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native-gesture-handler'
import Tools from '@/Tools/Tools'
import { connect } from "react-redux";
import { StoreState } from '@/Store/configureStore'
import { login, refreshTokenAction } from '@/ActionCreators/AuthActionCreator'
import * as Animatable from 'react-native-animatable'
import Toast from 'react-native-toast-message'
import { Colors } from '@/Theme'
import EncryptedStorage from 'react-native-encrypted-storage';

const LoginScreen = (props: any) => {

    const {
        isLoading,
        error,
        dispatchLogin,
        dispatchRefreshToken
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
                text2: error.message
            })
        }
    }, [error])

    const { t } = useTranslation();
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [inputError, setError] = React.useState(false);


    /**
     * @brief Check the syntax of the email when the user finishes typing
     */
    const onEndEditingEmail = () => {    
        if (!Tools.isEmail(email))
        {
            setError(true);

            Toast.show({
                type: 'error',
                text1: t('verification.email_title'),
                text2: t('verification.check_email'),
            });
        }
        else
        {
            setError(false);
        }
    }

    /**
     * @brief This function is called when we press the login button.
     * It dispatch an 'AuthActionTypes/LOGIN' type.
     */
    const onClickToLogin = () => {
        dispatchLogin(email, password);
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
                            enabled={!isLoading}
                            delay={animations.DURATION}
                            autoCompleteType={'email'}
                            keyboardType={'email-address'}
                        />
                        
                        {/* Password Input */}
                        <Field
                            title={t('authentification.password')}
                            containerStyle={styles.passwordContainer}
                            onChangeText={onChangePassword}
                            enabled={!isLoading}
                            delay={animations.DURATION * 2}
                            secureTextEntry={true}
                        />
                    </View>

                    <Animatable.View style={styles.buttonContainer} animation={animations.connectBtn} duration={1000} delay={animations.DURATION * 2 + 300}>
                        { isLoading ?
                            <ActivityIndicator color={Colors.primary} size={50} />
                            :
                            <BasicButton
                                disabled={inputError || !email || !password}
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

interface FieldProp extends TextInputProps
{
    title?: string;
    containerStyle: any;
    enabled?: boolean;
    delay: number;
}

const Field = (props: FieldProp) => {

    const {
        title,
        containerStyle,
        onChangeText,
        onEndEditing,
        enabled,
        delay,
        secureTextEntry
    } = props;

    return (
        <View style={containerStyle}>
            <Animatable.Text style={styles.sectionTitle} animation={animations.inputTitle} duration={600} delay={delay}>
                {title}
            </Animatable.Text>

            <Animatable.View animation="bounceIn" easing={"ease-in"} duration={1000} delay={delay + 300}>
                <TextInput
                    style={[ styles.input, Common.basicShadow ]}
                    onChangeText={onChangeText}
                    onEndEditing={onEndEditing}
                    enabled={enabled}
                    secureTextEntry={secureTextEntry}
                />
            </Animatable.View>
            
        </View>
    )
}


const mapStateToProps = (state: StoreState) => {
    return state.auth;
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        dispatchLogin: (email: string, password: string) => dispatch(login(email, password)),
        dispatchRefreshToken: (refreshToken: string) => dispatch(refreshTokenAction(refreshToken)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
