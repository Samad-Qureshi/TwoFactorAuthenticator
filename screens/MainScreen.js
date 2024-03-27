// MainScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import CodeComponent from '../components/CodeComponent';
import { colors } from '../assets/colors/colors';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MainScreen = ({ navigation }) => {


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAddService = () => {
        navigation.navigate('CodeInput');
    };

    const getData = async () => {
        try {
            setLoading(true);
            const jsonValue = await AsyncStorage.getItem("userCodes");
            console.log('Data retrieved successfully!', jsonValue);
            const _data = jsonValue != null ? JSON.parse(jsonValue) : null;
            if (_data?.length > 0) {
                console.log("data====", _data)
                setData(_data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error retrieving data:', error);
            //   return null;
        }
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData();
            console.log("main screen side effect")
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            {loading && <Loader />}
            {data?.length > 0 ? <FlatList
                data={data}
                renderItem={({ item }) => <CodeComponent title={item.title} secretKey={item.key} />}
                keyExtractor={item => item.key}
            /> : <Text style={styles.title}>Click on "+" icon to Add Service</Text>}
            {/* Floating Button */}
            <TouchableOpacity style={styles.floatingButton} onPress={handleAddService}>
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#222'
        // justifyContent: 'center',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginVertical: responsiveScreenHeight(5)
    },

    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.red,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    floatingButtonText: {
        fontSize: 24,
        color: colors.white,
    },
});

export default MainScreen;
