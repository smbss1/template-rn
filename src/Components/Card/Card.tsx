import React from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale'
import french from 'dayjs/locale/fr'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import * as Animatable from 'react-native-animatable'

import { News } from '@/Models';
import styles from './CardStyles'
import { navigate } from '@/Navigators/Root';


dayjs.extend(updateLocale)
dayjs.extend(localizedFormat)

dayjs.updateLocale('fr', {
    weekdaysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
})

interface Props
{
    news: News;
    show_header?: boolean
}

const Card = ({ news, show_header }: Props) => {

    const { id, title, date, image } = news;
    const formatedDate = dayjs(date).locale(french).format("ddd D MMMM YYYY");

    /**
     * @brief When card is pressed, redirect the user to the details screen with news information
     */
    const onPressCard = () => {
        navigate("NewsDetailsScreen", { newsInfo: news})
    }

    return (
        <TouchableOpacity onPress={onPressCard}>
            <Animatable.View
                style={styles.card}
                animation="slideInLeft"
                delay={100 + (id - 1) * 100}
            >
                <ImageBackground source={{uri: image }} style={styles.image}>
    
                    {/* Background Color Overlay */}
                    <View style={styles.overlay} />

                    {/* Title */}
                    <Text style={styles.title}>
                        {title}
                    </Text>

                    {/* Date Header */}
                    { show_header &&
                        <View style={styles.dateContainer}>
                            <View style={styles.dateBackground} />
                            <Text style={styles.date}>
                                {formatedDate}
                            </Text>
                        </View>
                    }
                </ImageBackground>
            </Animatable.View>
        </TouchableOpacity>
    )
}

export default Card