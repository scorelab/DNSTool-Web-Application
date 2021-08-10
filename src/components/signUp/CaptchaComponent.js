import React, { useCallback, useEffect } from 'react'
import {
    useGoogleReCaptcha
} from 'react-google-recaptcha-v3';

function CaptchaComponent({ getToken }) {
    const { executeRecaptcha } = useGoogleReCaptcha();

    // Create an event handler so you can call the verification on button click event or form submit
    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
        } else {
            const token = await executeRecaptcha('Registration');
            getToken(token)
        }
    }, [executeRecaptcha]);

    useEffect(() => {
        handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);


    // You can use useEffect to trigger the verification as soon as the component being loaded


    return <></>
}

export default CaptchaComponent
