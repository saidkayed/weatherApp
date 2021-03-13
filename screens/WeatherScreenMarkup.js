import React from 'react'
import { View, ScrollView, Text, StyleSheet, SafeAreaView, RefreshControl, ImageBackground } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

WeatherScreenMarkup = (props) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            
            <ImageBackground source={require('../assets/bgw.jpg')} style={styles.backgroundImage}>
            <ScrollView contentContainerStyle={styles.container} bounces={false} refreshControl={
                <RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />
            }>
                            

                <View style={{ alignItems: 'center' }}>
                    <Icon name="home-city-outline" size={hp('10%')} color="black" />
                    <Text style={{ fontSize: hp('7%') }} >{props.city}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: hp('10%') }}>{props.temperature}</Text>
                    <Icon name="temperature-celsius" size={hp('10%')} color="black" />
                </View>
                <View>
                    <Text style={{ fontSize: hp('4%') }}>{props.skyText}</Text>
                </View>
               
            </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: hp('5%'),
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
        paddingBottom: hp('5%'),
    },
    backgroundImage: {
        flex:1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
    },
})

export default WeatherScreenMarkup 
