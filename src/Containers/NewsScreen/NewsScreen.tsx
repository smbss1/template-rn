import React, { Dispatch } from 'react'
import { View, Text, Image, RefreshControl } from 'react-native'
import { Common, Images } from '@/Theme'
import styles from './NewsScreenStyles'
import { useTranslation } from 'react-i18next'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from "react-redux";
import { StoreState } from '@/Store/configureStore'
import { getNews } from '@/ActionCreators/NewsActionCreator'
import EncryptedStorage from 'react-native-encrypted-storage';
import { logout } from '@/ActionCreators/AuthActionCreator'
import { NavHeader, Card } from '@/Components'

const NewsScreen = (props: any) => {

    React.useEffect(() => {
        // If we login, save the refreshToken
        EncryptedStorage.setItem("refreshToken", auth.refreshToken)
        onRefresh();
    }, []);

    const {
        news,
        auth,
        dispatchGetNews,
        dispatchLogout,
    } = props;

    const { t } = useTranslation();

    const onRefresh = React.useCallback(async () => {
        // Because we login, we can get the news from API
        dispatchGetNews();
    }, []);

    /**
     * @brief When back arrow is pressed, logout the user
     */
    const onPressBack = () => {
        EncryptedStorage.removeItem("refreshToken")
            .then(() => {
                dispatchLogout();
            });
    }
    
    return (
        <View style={[Common.basicPage]}>

            {/* Nav Header */}
            <NavHeader title={t('home.news')} onPressBack={onPressBack}/>

            {/* Card List */}
            <View style={styles.cardContainer}>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 30 }}
                    data={news.news}
                    keyExtractor={(item) => { return item.id.toString(); }}
                    renderItem={({item}) => (
                        <Card news={item} show_header={true} />
                    )}
                    refreshControl={<RefreshControl refreshing={news.isLoading} onRefresh={onRefresh} />}
                />
            </View>
        </View>
    );
}

const mapStateToProps = (state: StoreState) => {
    return { news: state.news, auth: state.auth };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        dispatchGetNews: () => dispatch(getNews()),
        dispatchLogout: () => dispatch(logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen);
