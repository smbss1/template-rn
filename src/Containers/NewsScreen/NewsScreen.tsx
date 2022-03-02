import React, { Dispatch } from 'react'
import { View, RefreshControl } from 'react-native'
import { Common } from '@/Theme'
import styles from './NewsScreenStyles'
import { useTranslation } from 'react-i18next'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from "react-redux";
import { StoreState } from '@/Store/configureStore'
import { getNews } from '@/ActionCreators/NewsActionCreator'
import EncryptedStorage from 'react-native-encrypted-storage';
import { logout } from '@/ActionCreators/AuthActionCreator'
import { NavHeader, Card } from '@/Components'
import { News } from '@/Models'
import { navigate, navigationRef } from '@/Navigators/Root'
import * as Animatable from 'react-native-animatable'

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

    const [isRefreshing, setRefresh] = React.useState(false)

    React.useEffect(() => {
        console.log("jlnk")
        setRefresh(news.isLoading)
    }, [news.isLoading]);

    const onRefresh = React.useCallback(() => {
        console.log("knkn")
        // Because we login, we can get the news from API

        setRefresh(true)
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

    /**
     * @brief When card is pressed, redirect the user to the details screen with news information
     */
     const onPressCard = (news: News) => {
        navigate("NewsDetailsScreen", { newsInfo: news})
    }

    const renderItem = (item: News) => {
        return (
            <Animatable.View animation={"fadeIn"} delay={ item.id * 200 }>
                <TouchableOpacity onPress={() => onPressCard(item)}>
                    <Card news={item} show_header={true} />
                </TouchableOpacity>
            </Animatable.View>
        )
    }
    
    return (
        <View style={[Common.basicPage, { alignItems: 'center' }]}>

            {/* Nav Header */}
            <NavHeader title={t('home.news')} onPressBack={onPressBack}/>

            {/* Card List */}
            <View style={styles.cardContainer}>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 30 }}
                    data={news.news}
                    keyExtractor={(item) => { return item.id.toString(); }}
                    collapsable={false}
                    renderItem={({item}) => renderItem(item)}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={news.isLoading} onRefresh={onRefresh} />
                    }
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
