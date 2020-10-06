import React from 'react'
import { Text, View } from 'react-native';
import { getWeather } from '../api/weatherApi';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import WeatherScreenMarkup from './WeatherScreenMarkup'

class WeatherScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            location: "",
            errorMSG: "",
            skyText: "",
            temperature: "",
        }
    }

    componentDidMount = async () => {
        await this.getLocation();
        await this.fetchWeather();
    }





    getLocation = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            console.log('PERMISSION DENIED')

            this.setState({
                errorMSG: 'PERMISSION DENIED'
            })
        }

        const userLocation = await (await Location.getCurrentPositionAsync());


        const currLOC = await Location.reverseGeocodeAsync({ latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude });

        currLOC.find(p => {
            this.setState({ location: p.city })
        })
    }

    fetchWeather = async () => {
        await getWeather(this.state.location).then((res) =>{
            this.setState({
                skyText: res.skyText,
                temperature: res.temperature
            })
        })
    }

    render() {
        return (
            <WeatherScreenMarkup
            city = {this.state.location}
            temperature = {this.state.temperature}
            skyText = {this.state.skyText}
            />
        );
    }
}

export default WeatherScreen