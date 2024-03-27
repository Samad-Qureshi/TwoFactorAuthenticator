import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createTOTP } from "totp-auth";
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import ProgressCircle from 'react-native-progress-circle';

//Images
import Facebook from '../assets/images/facebook.png';
import Instagram from '../assets/images/insta.png';
import Twitter from "../assets/images/twitter.png";
import Other from "../assets/images/other.png";
import { colors } from '../assets/colors/colors';

const CodeComponent = ({ icon, title, secretKey }) => {

    const secret = secretKey;
    let totp = createTOTP(secret)


    const [code, setCode] = useState(totp)
    const [counter, setCounter] = useState(60);

    useEffect(() => {
        let _code = totp = createTOTP(secret);
        if (!counter) {
            setTimeout(() => {
                setCounter(60)
                setCode(_code);
            }, 0);
        };

        const intervalID = setInterval(() => {
            setCounter(value => value - 1);
        }, 1000);

        return () => clearInterval(intervalID);

    }, [counter])


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                    <Image source={ title == "Facebook" ? Facebook : 
                                    title == "Instagram" ? Instagram :
                                    title == "Twitter" ? Twitter : Other } 
                                    style={styles.icon}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{code}</Text>
                </View>
            </View>

            <View>
            <ProgressCircle
                percent={counter/60*100}
                radius={20}
                borderWidth={2}
                color={colors.white}
                bgColor={colors.darkGrey}>
                
                <Text style={styles.timer}>{counter}</Text>
            </ProgressCircle>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginVertical:5,
        paddingHorizontal: 12,
        paddingVertical: 20,
        width: responsiveScreenWidth(100),
        borderLeftWidth: 1,
        borderTopWidth:3,
        borderColor:colors.border,
        margin:2,
    },

    icon: {
        marginRight: 10,
    },
    textContainer: {
        flexDirection: 'column',
    },
    timer: {
        fontSize: responsiveScreenFontSize(2),
        color:colors.white,
        fontWeight:'300'
    },
    title: {
        fontSize: responsiveFontSize(2),
        fontWeight:'400',
        color:colors.white,
    },
    description: {
        fontSize: responsiveFontSize(5),
        fontWeight: '200',
        color:colors.white,
    },
    icon:{width:responsiveScreenWidth(15),height:responsiveScreenWidth(15),marginRight:responsiveScreenWidth(3)}
});

export default CodeComponent;
