// CodeInputScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput,StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert} from 'react-native';
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import ToggleButton from '../components/ToggleButton';
import { colors } from '../assets/colors/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Images
import showIcon from '../assets/images/show.png';
import hideIcon from '../assets/images/hide.png';
import Loader from '../components/Loader';

const CodeInputScreen = ({ navigation }) => {

    const [serviceName, setServiceName] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [showSecretKey, setShowSecretKey] = useState(false);
    const [loading,setLoading] = useState(false);



    const handleToggleSecretKey = () => {
        setShowSecretKey(!showSecretKey);
    };

    const setData = async (value)=>{
        try {
          setLoading(true);
          const jsonValue = await  AsyncStorage.getItem("userCodes");
          const data = jsonValue != null ? JSON.parse(jsonValue) : [];
          data.push(value);
          await AsyncStorage.setItem("userCodes", JSON.stringify(data));
          setLoading(false);
          navigation.replace("Main");
          console.log('Data stored successfully!',data);
        } catch (error) {
          setLoading(false);
          console.error('Error storing data:', error);
        }
      }
      
    const handleAddService = () => {
        if(secretKey.length < 4){
            Alert.alert('Key is too short', 'Minimum 4 characters', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
            return;
        }
        console.log(`Service Name: ${serviceName},Secret Key: ${secretKey}`);
        setData({
            key: secretKey?.trim(),
            title: serviceName?.trim(),
            icon: serviceName?.trim()
        });
        // navigation.goBack();
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            {loading && <Loader/>}
            <View>
                
                <Text style={styles.label}>Service Name</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={serviceName}
                        onChangeText={setServiceName}
                        placeholder="Enter service name"
                    />
                </View>
                
                <Text style={styles.label}>Secret Key</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={secretKey}
                        maxLength={32}
                        onChangeText={setSecretKey}
                        placeholder="Enter secret key"
                        secureTextEntry={!showSecretKey}
                    />
                    <ToggleButton icon={showSecretKey ? hideIcon : showIcon} handler={handleToggleSecretKey} />
                </View>

            </View>
            <TouchableOpacity
                style={{
                    ...styles.btn,
                    backgroundColor: serviceName && secretKey ? colors.red : colors.lightGrey
                }}
                disabled={serviceName && secretKey ? false : true}
                onPress={handleAddService}>
                <Text style={{
                    ...styles.btnTxt,
                    color: serviceName && secretKey ? colors.white : colors.grey
                }}>Add Service</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: responsiveScreenWidth(5),
        backgroundColor: colors.darkGrey
    },
    label: {
        fontSize: responsiveFontSize(2.5),
        marginBottom: 10,
        color: colors.white
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: colors.lightGrey,
        borderWidth: 1,
        borderRadius: responsiveScreenWidth(2),
        padding: responsiveScreenWidth(2.5),
        fontSize: responsiveFontSize(2.5),
        marginBottom: responsiveScreenHeight(3),
        width: responsiveScreenWidth(90),
    },
    input: {
        fontSize: responsiveFontSize(2),
    },
    btn: {
        width: responsiveScreenWidth(90),
        height: responsiveScreenHeight(5),
        borderRadius: responsiveScreenWidth(8),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.grey,
    },
    btnTxt: {
        fontSize: responsiveScreenFontSize(2),
        fontWeight: 'bold',
    }
});

export default CodeInputScreen;
