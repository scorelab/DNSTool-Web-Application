import React, { useState, useEffect } from 'react'
import zxcvbn from "zxcvbn";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Stack, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

function PasswordChecker({ password, checkPasswordStrength }) {

    const [score, setScore] = useState('')
    const [color, setColor] = useState('error')
    const [fontColor, setFontColor] = useState('red')
    const [msg, setMsg] = useState('Password is short')

    useEffect(() => {

        async function settingUpScore() {
            await setScore(zxcvbn(password).score * 25)
        }

        settingUpScore();

        switch (score) {
            case 25:
                setMsg('Password is weak')
                setFontColor('red')
                setColor('error')
                break;
            case 50:
                setMsg('Password is Sufficient')
                setFontColor('orange')
                checkPasswordStrength(true)
                setColor('warning')
                break;
            case 75:
                setMsg('Password is Good')
                setFontColor('lightgreen')
                checkPasswordStrength(true)
                setColor('warning')
                break;
            case 100:
                setMsg('')
                setColor('success')
                checkPasswordStrength(true)
                break;
            default:
                break;
        }

    }, [password])

    return (
        <>
            {
                password && password.length > 0 && (
                    <Stack style={{ marginTop: '10px' }} sx={{ maxWidth: '400px' }}>
                        <Typography color={fontColor} fontSize="16px" fontWeight='bold' textAlign="right">
                            {msg}
                        </Typography>
                        <Typography color="#5f5f5f" fontSize="12px" textAlign="left">
                            To conform with our Strong Password policy, you are required to use a sufficiently strong password. Password must be more than 7 characters.
                        </Typography>
                        <LinearProgress variant="determinate" value={score} style={{ marginTop: '20px', maxWidth: '400px' }} color={color} />
                    </Stack>
                )
            }
        </>
    )
}

PasswordChecker.propTypes = {
    password: PropTypes.string,
    checkPasswordStrength: PropTypes.func
};

export default PasswordChecker
