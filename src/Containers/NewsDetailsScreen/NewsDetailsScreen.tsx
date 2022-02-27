import React, { Dispatch } from 'react'
import { View, Text, Image, ActivityIndicator, RefreshControl } from 'react-native'
import { Common, Images } from '@/Theme'
import styles from './NewsDetailsScreenStyles'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler'
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
import { navigate, navigateAndReset } from '@/Navigators/Root'
import Card from '@/Components/Card/Card'
import { NavHeader } from '@/Components'

dayjs.extend(localizedFormat)
dayjs.extend(updateLocale)

dayjs.updateLocale('fr', {
    weekdaysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
})

const NewsDetailsScreen = (props: any) => {

    React.useEffect(() => {
    }, []);

    const {
        newsInfo,
    } = props.route.params;

    const { t } = useTranslation();

    const onPressBack = () => {
        navigate("NewsScreen", { })
    }
    
    return (
        <View style={[Common.basicPage]}>
            <NavHeader title={t('home.article')} onPressBack={onPressBack}/>

            {/* <Card news={newsInfo}/> */}
            <Text>{newsInfo.title}</Text>
        </View>
    );
}

interface CardProp
{
    news: News;
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
    };
};

export default connect(null, mapDispatchToProps)(NewsDetailsScreen);
