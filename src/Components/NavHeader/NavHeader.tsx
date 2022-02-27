import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './NavHeaderStyles'
import { Images } from '@/Theme';

interface Props
{
    title: string,
    onPressBack?: () => void
}

const NavHeader = ({ title, onPressBack }: Props) => {

    return (
        <View style={styles.headerContainer}>

            {/* Back Arrow */}
            <TouchableOpacity onPress={onPressBack}>
                <Image source={Images.leftArrow} />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>
                {title}
            </Text>

            <View style={styles.leftContainer}>
            </View>
        </View>
    )
}

export default NavHeader