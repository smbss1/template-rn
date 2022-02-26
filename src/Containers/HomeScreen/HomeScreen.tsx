import React, { Dispatch } from 'react'
import { View, Text, Image, ActivityIndicator, RefreshControl } from 'react-native'
import { Common, Images } from '@/Theme'
import styles from './HomeScreenStyles'
import { useTranslation } from 'react-i18next'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import Tools from '@/Tools/Tools'
import { connect } from "react-redux";
import { StoreState } from '@/Store/configureStore'
import * as Animatable from 'react-native-animatable'
import { getNews } from '@/ActionCreators/NewsActionCreator'
import EncryptedStorage from 'react-native-encrypted-storage';
import { News } from '@/Models'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import updateLocale from 'dayjs/plugin/updateLocale'
import french from 'dayjs/locale/fr'

dayjs.extend(localizedFormat)
dayjs.extend(updateLocale)

dayjs.updateLocale('fr', {
    weekdays: [
        "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"
    ],
    weekdaysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
})

const HomeScreen = (props: any) => {

    const {
        news,
        auth,
        dispatchGetNews,
    } = props;

    const { t } = useTranslation();

    const onRefresh = React.useCallback(async () => {

        // Because we login, we can get the news from API
        dispatchGetNews();
      }, []);
    
      React.useEffect(() => {
        // If we login, save the refreshToken
        EncryptedStorage.setItem("refreshToken", auth.refreshToken)
        onRefresh();
      }, []);
    
    return (
        <View style={[Common.basicPage]}>

            <Text style={styles.title}>{t('home.news')}</Text>

            <TouchableOpacity>
                <Image source={Images.leftArrow} style={styles.titleArrow} />
            </TouchableOpacity>

            <View style={styles.cardContainer}>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={news.news}
                    keyExtractor={({item}, index) => { return "0" + index; }}
                    renderItem={({item}) => (<Card news={item}/>) }
                    refreshControl={<RefreshControl refreshing={news.isLoading} onRefresh={onRefresh} />}
                />
            </View>
        </View>
    );
}

interface CardProp
{
    news: News;
}

const Card = (prop: CardProp) => {

    const { id, body, title, date, image } = prop.news;

    const formatedDate = dayjs(date).locale(french).format("ddd D MMMM YYYY");

    return (
        <TouchableOpacity>
            <Animatable.View
                style={styles.card}
                animation="slideInLeft"
                delay={100 + (id - 1) * 100}
            >
                <Image source={{uri: image }} style={styles.cardImage}/>
                <Text style={styles.cardTitle}>{title}</Text>
                <View style={styles.cardDateContainer}>
                    <View style={styles.cardDateBackground} />
                    <Text style={styles.cardDate}>
                        {formatedDate}
                    </Text>
                </View>
            </Animatable.View>
        </TouchableOpacity>
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
