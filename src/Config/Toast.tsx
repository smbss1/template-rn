import React from 'react';

import { Colors } from '@/Theme'
import { ErrorToast } from 'react-native-toast-message'

const ToastConfig = {
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: Colors.error }}
            text1Style={{
                fontSize: 15,
                color: Colors.error
            }}
            text2Style={{
                fontSize: 13
            }}
            text2NumberOfLines={2}
        />
    )
};

export default ToastConfig;