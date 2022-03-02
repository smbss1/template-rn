import React, { ReactNode } from 'react'
import { TextInput, TextInputProps, View } from 'react-native';
import * as Animatable from 'react-native-animatable'

import styles from './FieldStyles'
import { Common } from '@/Theme';

const inputTitle = {
    0: {
        transform: [
            {
                translateY: -20
            }
        ],
        opacity: 0
    },
    1: {
        transform: [
            {
                translateY: 0
            }
        ],
        opacity: 0.4
    },
};

interface Props extends TextInputProps
{
    title?: string;
    containerStyle: any;
    enabled?: boolean;
    delay: number;
    children?: ReactNode
}

const Field = (props: Props) => {

    const {
        title,
        containerStyle,
        onChangeText,
        onEndEditing,
        enabled,
        delay,
        secureTextEntry,
        children,
        autoCompleteType,
        keyboardType,
        returnKeyType
    } = props;

    return (
        <View style={containerStyle}>
            <Animatable.Text
                style={styles.sectionTitle}
                animation={inputTitle}
                duration={600}
                delay={delay}
            >
                {title}
            </Animatable.Text>

            <Animatable.View
                animation="bounceIn"
                easing={"ease-in"}
                duration={1000}
                delay={delay + 300}
                style={[ styles.input, Common.basicShadow ]}
            >
                <TextInput
                    // style={[ styles.input, Common.basicShadow ]}
                    onChangeText={onChangeText}
                    onEndEditing={onEndEditing}
                    enabled={enabled}
                    secureTextEntry={secureTextEntry}
                    autoCompleteType={autoCompleteType}
                    keyboardType={keyboardType}
                    returnKeyType={returnKeyType}
                />
                {children}
            </Animatable.View>
        </View>
    )
}


export default Field