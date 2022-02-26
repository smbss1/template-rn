import React, { Dispatch, useEffect, useRef } from 'react'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import { Common, Images } from '@/Theme'
import Fonts from '@/Theme/FontsTypes'
import styles from './LoginScreenStyles'
import { BasicButton } from '@/Components'
import { useTranslation } from 'react-i18next'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import * as actionTypes from '@/ActionTypes/AuthActionTypes'
import Tools from '@/Tools/Tools'
import { connect } from "react-redux";
import { StoreState } from '@/Store/configureStore'
import { login, loginFailure, register } from '@/ActionCreators/AuthActionCreator'
import * as Animatable from 'react-native-animatable'
import Toast from 'react-native-toast-message'
import { Colors } from '@/Theme'

const LoginScreen = (props: any) => {

    const {
        isLoading,
        error,
        token,
        refreshToken,
        dispatchLogin,
        dispatchRegister
    } = props;

    useEffect(() => {
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
    

    // dispatchRegister("samuel.besseau@epitech.eu", "samuel")
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

    const onClickToLogin = () => {
        dispatchLogin(email, password);
    }

    return (
        <View style={[Common.basicPage]}>
            <Image source={Images.loginBackground} style={styles.backgroundImage}/>
            <Animatable.View style={styles.contentContainer} animation="slideInUp" duration={800}>
                <Text style={styles.title}>{t('authentification.connection')}</Text>

                <View style={styles.content}>

                    <View style={styles.fieldContainer}>
                        <Field
                            sectionText={t('authentification.mail')}
                            containerStyle={styles.mailContainer}
                            onChangeText={onChangeEmail}
                            onEndEditing={onEndEditingEmail}
                        />
                        
                        <Field
                            sectionText={t('authentification.password')}
                            containerStyle={styles.passwordContainer}
                            onChangeText={onChangePassword}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        { isLoading ?
                            <ActivityIndicator color={Colors.primary} size={50} />
                            :
                            <BasicButton
                                disabled={inputError || !email || !password}
                                text={t('authentification.connect')}
                                onPress={onClickToLogin}
                            />
                        }
                    </View>
                </View>
            </Animatable.View>

        </View>
    );
}

const Field = (props: any) => {

    const {
        sectionText,
        containerStyle,
        onChangeText,
        onEndEditing,
        children
    } = props;

    return (
        <View style={containerStyle}>
            <Text style={styles.sectionTitle}>{sectionText}</Text>
            <TextInput
                style={[
                    styles.input,
                    Common.basicShadow,
                    {
                        fontSize: 16,
                        fontFamily: Fonts.type.light
                    }
                ]}
                onChangeText={onChangeText}
                onEndEditing={onEndEditing}
            />

            {/* { errorMessage ?
                <Animatable.View style={styles.errorContainer} animation="fadeIn" duration={500} easing="linear">
                    <Text style={styles.errorMessage}>
                        {errorMessage}
                    </Text>
                </Animatable.View>
                : null
            } */}

            {children}
        </View>
    )
}


const mapStateToProps = (state: StoreState) => {
    return state.auth;
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        dispatchLogin: (email: string, password: string) => dispatch(login(email, password)),
        dispatchRegister: (email: string, password: string) => dispatch(register(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
