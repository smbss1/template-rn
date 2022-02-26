import React, { Dispatch, useEffect, useRef } from 'react'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import { Common, Images } from '@/Theme'
import Fonts from '@/Theme/FontsTypes'
import styles from './HomeScreenStyles'
import { BasicButton } from '@/Components'
import { useTranslation } from 'react-i18next'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import * as actionTypes from '@/ActionTypes/AuthActionTypes'
import Tools from '@/Tools/Tools'
import { connect } from "react-redux";
import { StoreState } from '@/Store/configureStore'
import { login, loginFailure, register } from '@/ActionCreators/AuthActionCreator'
import * as Animatable from 'react-native-animatable'

const HomeScreen = (props: any) => {

    const {
        token,
        refreshToken,
    } = props;

    useEffect(() => {
        
    }, [])

    const { t } = useTranslation();
    
    return (
        <View style={[Common.basicPage]}>
            <Animatable.View animation="slideInLeft" duration={800}>
                <Text style={styles.title}>{t('authentification.connection')}</Text>
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
        dispatchRegister: (email: string, password: string) => dispatch(register(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
