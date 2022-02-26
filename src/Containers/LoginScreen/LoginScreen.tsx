import React, { Dispatch, useEffect, useRef } from 'react'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import { Common, Images } from '@/Theme'
import Fonts from '@/Theme/FontsTypes'
import styles from './LoginScreenStyles'
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

    useEffect(() => {

        // If we login previously, so try to get a new token
        EncryptedStorage.getItem("refreshToken")
            .then((refreshToken) => {

                if (refreshToken)
                {
                    dispatchRefreshToken(refreshToken);
                }
            })
        
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
            <Animatable.View style={styles.contentContainer} animation="slideInUp" duration={800}>
                
                {/* Title */}
                <Text style={styles.title}>
                    {t('authentification.connection')}
                </Text>

                {/* Form */}
                <View style={styles.content}>
                    <View style={styles.fieldContainer}>

                        {/* Email Input */}
                        <Field
                            sectionText={t('authentification.mail')}
                            containerStyle={styles.mailContainer}
                            onChangeText={onChangeEmail}
                            onEndEditing={onEndEditingEmail}
                        />
                        
                        {/* Password Input */}
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

interface FieldProp
{
    sectionText?: string;
    containerStyle: any;
    onChangeText: (text: string) => void;
    onEndEditing?: () => void;
}

const Field = (props: FieldProp) => {

    const {
        sectionText,
        containerStyle,
        onChangeText,
        onEndEditing,
    } = props;

    return (
        <View style={containerStyle}>
            <Text style={styles.sectionTitle}>{sectionText}</Text>
            <TextInput
                style={[ styles.input, Common.basicShadow ]}
                onChangeText={onChangeText}
                onEndEditing={onEndEditing}
            />
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
