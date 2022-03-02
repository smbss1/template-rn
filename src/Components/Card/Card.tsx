import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale'
import french from 'dayjs/locale/fr'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import { News } from '@/Models';
import styles from './CardStyles'
import { SharedElement } from 'react-navigation-shared-element';


dayjs.extend(updateLocale)
dayjs.extend(localizedFormat)

dayjs.updateLocale('fr', {
    weekdaysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
})

interface Props
{
    news: News;
    show_header?: boolean,
}

const Card = ({ news, show_header }: Props) => {

    const { id, title, date, image } = news;
    const formatedDate = dayjs(date).locale(french).format("ddd D MMMM YYYY");

    return (
        <View style={styles.card} key={id}>
            <SharedElement id={`${id}.image`} style={StyleSheet.absoluteFill}>
                <Image style={styles.image} source={{uri: image}} resizeMode='cover'/>
            </SharedElement>

            <SharedElement id={`${id}.overlay`} style={StyleSheet.absoluteFill}>
                <View style={styles.overlay} />
            </SharedElement>

            { show_header &&
                <SharedElement id={`${id}.date`}>
                    <View style={styles.dateContainer}>
                        <View style={styles.dateBackground} />

                            <Text style={styles.date}>
                                {formatedDate}
                            </Text>

                    </View>
                </SharedElement>
            }

            <SharedElement id={`${id}.title`} style={StyleSheet.absoluteFill}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </SharedElement>
        </View>
    )
}

export default Card