import React, { Dispatch, useEffect, useRef } from 'react'
import { View, Text, Image, ActivityIndicator, RefreshControl } from 'react-native'
import { Common, Images } from '@/Theme'
import Fonts from '@/Theme/FontsTypes'
import styles from './HomeScreenStyles'
import { BasicButton } from '@/Components'
import { useTranslation } from 'react-i18next'
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import * as actionTypes from '@/ActionTypes/AuthActionTypes'
import Tools from '@/Tools/Tools'
import { connect } from "react-redux";
import { StoreState } from '@/Store/configureStore'
import * as Animatable from 'react-native-animatable'
import { getNews } from '@/ActionCreators/NotificationsActionCreator'

const HomeScreen = (props: any) => {

    const {
        news,
        auth,
        dispatchGetNews,
    } = props;


    const { t } = useTranslation();
    // Indicate if the posts are loading or not
    const [error, setError] = React.useState("");

    const onRefresh = React.useCallback(async () => {
        dispatchGetNews();

        // reddit.subreddit.mine.home(auth)
        //   .then((response) => {
        //     setPosts(response["data"]["children"]);
        //     setError(false);
        //   })
        //   .catch((err) => {
        //     setError("Error when try get posts");
        //     setIsError(true);
        //   })
        //   .finally(() => {
        //     setRefreshing(false);
        //     setLoading(false);
        //   });
      }, []);
    
      // On Component mount
      React.useEffect(() => {
        onRefresh();
      }, []);
    
    return (
        <View style={[Common.basicPage]}>
            <Animatable.View animation="slideInLeft" duration={800} style={styles.titleContainer}>
                <Image source={Images.leftArrow} style={styles.titleArrow} />
                <Text style={styles.title}>{t('home.news')}</Text>
            </Animatable.View>

            <FlatList
                data={news.news}
                keyExtractor={({item}, index) => { return "0" + index; }}
                renderItem={({item}) => (<Card data={item}/>) }
                refreshControl={<RefreshControl refreshing={news.isLoading} onRefresh={onRefresh} />}
            />

            {/* <Animatable.View animation="slideInLeft" duration={800} style={styles.cardContainer}>
                <Card />
            </Animatable.View> */}
        </View>
    );
}

const Card = (props: any) => {

    const { data } = props;
    
    return (
        <View style={styles.card}>

        </View>
    )
}

const mapStateToProps = (state: StoreState) => {
    return { news: state.news, auth: state.auth };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        dispatchGetNews: () => dispatch(getNews()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
