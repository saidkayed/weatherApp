import React from 'react'
import { getWeather } from '../api/weatherApi';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import WeatherScreenMarkup from './WeatherScreenMarkup'
import * as Notifications from 'expo-notifications';

class WeatherScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            location: "",
            errorMSG: "",
            skyText: "",
            temperature: "",
            refreshing: false,
        }
    }

    Notify = async (temp, skyText) => {

        // Notifications show only when app is not active.
        // (ie. another app being used or device's screen is locked)

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Godmorgen dagens vejr!",
                body: `Temperature: ${temp} - SkyStatus: ${skyText}`,
                data: { data: 'goes here' },
            },
            trigger: { hour: 8, minute: 0, repeats: true, },
        });
    }

    componentDidMount = async () => {
        await this.getLocation();
        await this.fetchWeather();
        this.Notify(this.state.temperature, this.state.skyText)
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.fetchWeather();
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
        await getWeather(this.state.location).then((res) => {
            this.setState({
                skyText: res.skyText,
                temperature: res.temperature,
                refreshing: false
            })
        })
        .catch((err) => {
            console.log(err)
            this.setState({refreshing: false})
        })
    }

    render() {
        return (
            <WeatherScreenMarkup
                city={this.state.location}
                temperature={this.state.temperature}
                skyText={this.state.skyText}
                onRefresh={this.onRefresh}
                refreshing={this.state.refreshing}
            />
        );
    }
}

export default WeatherScreen