import React, { Dispatch } from 'react'
import { View, Text, Image, ActivityIndicator, RefreshControl, ImageBackground, StyleSheet, Button, StyleProp, ViewStyle } from 'react-native'
import { Common, Images, Metrics } from '@/Theme'
import styles from './NewsDetailsScreenStyles'
import { useTranslation } from 'react-i18next'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Tools from '@/Tools/Tools'
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import updateLocale from 'dayjs/plugin/updateLocale'
import french from 'dayjs/locale/fr'
import { goBack, navigationRef } from '@/Navigators/Root'
import { NavHeader } from '@/Components'
import { SharedElement } from 'react-navigation-shared-element'

dayjs.extend(localizedFormat)
dayjs.extend(updateLocale)

dayjs.updateLocale('fr', {
    weekdaysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
})

const NewsDetailsScreen = (props: any) => {

    const {
        newsInfo,
    } = props.route.params;

    const { t } = useTranslation();
    const formatedDate = dayjs(newsInfo.date).locale(french).format("ddd D MMMM YYYY");

    const onPressBack = () => {
        goBack()
    }
    
    return (
        <View style={[Common.basicPage, { alignItems: 'center' } ]}>
            
            {/* Nav Header */}
            <NavHeader title={t('home.article')} onPressBack={onPressBack}/>

            <ScrollView style={{ width: Metrics.widthPercentageToDP('90%')}} showsVerticalScrollIndicator={false}>
                {/* Article Card */}
                <View style={styles.card} key={newsInfo.id}>

                    {/* Card Image */}
                    <SharedElement id={`${newsInfo.id}.image`} style={StyleSheet.absoluteFill}>
                        <Image style={styles.image} source={{uri: newsInfo.image}} resizeMode='cover'/>
                    </SharedElement>

                    {/* Card Image Overlay */}
                    <SharedElement id={`${newsInfo.id}.overlay`} style={StyleSheet.absoluteFill}>
                        <View style={styles.overlay} />
                    </SharedElement>

                    {/* Card Title */}
                    <SharedElement id={`${newsInfo.id}.title`} style={StyleSheet.absoluteFill}>
                        <Text style={styles.title}>
                            {newsInfo.title}
                        </Text>
                    </SharedElement>
                </View>

                {/* Article Card */}
                <View style={styles.container}>

                    {/* Date */}
                    <Animatable.Text style={styles.date} animation="fadeInUp">
                        {formatedDate}
                    </Animatable.Text>

                    {/* Share Button */}
                    <Animatable.View animation="fadeIn" delay={200}>
                        <ShareButton fontSize={16} />
                    </Animatable.View>
                </View>

                
                <View style={styles.bodyContainer}>
                    {/* Title Body */}
                    <Animatable.View style={styles.bodyTitleContainer} animation="fadeInUp" delay={200}>
                        <Text style={styles.bodyTitle}>
                            {"Lorem ipsum dolor sit amet, consetetur sadipscing elitr"}
                        </Text>
                    </Animatable.View>

                    {/* Text Body */}
                    <Animatable.Text style={styles.text} animation="fadeInUp" delay={400}>
                        {`${newsInfo.body}`}
                    </Animatable.Text>
                </View>
                <View style={{
                    marginTop: 34,
                    marginBottom: 150
                }}>
                    <ShareButton fontSize={18} iconStyle={{ width: 25, height: 27 }} />
                </View>
            </ScrollView>
        </View>
    );
}

interface Props
{
    onPress?: () => void,
    fontSize?: number,
    textStyle?: ViewStyle,
    iconStyle?: ViewStyle,
}

const ShareButton = (props: Props) => {

    const { fontSize, textStyle, iconStyle, onPress } = props;
    const { t } = useTranslation();

    return (
        <TouchableOpacity style={styles.shareContainer} onPress={onPress}>
            <Image source={Images.share} style={[styles.shareIcon, iconStyle]} />
            <Text style={[styles.share, { fontSize }, textStyle]}>
                {t('home.share')}
            </Text>
        </TouchableOpacity>
    )
}


NewsDetailsScreen.sharedElements = (route: any, otherRoute: any, showing: boolean) => {

    const { newsInfo } = route.params;
    return [
        {
            id: `${newsInfo.id}.image`,
            animation: "fade",
            align: 'center-center',
            resize: 'clip'
        },
        {
            id: `${newsInfo.id}.title`,
            animation: "fade",
            resize: 'clip'
        },
        {
            id: `${newsInfo.id}.overlay`,
            animation: "fade",
            // animation: "move",
        },
        {
            id: `${newsInfo.id}.date`,
            animation: "move",
            resize: 'clip'
        }
    ];
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
    };
};

export default connect(null, mapDispatchToProps)(NewsDetailsScreen);
