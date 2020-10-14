import React from 'react';
import * as Permissions from "expo-permissions";
import Constants from "expo-constants"




//Screens
import WeatherScreen from './screens/WeatherScreen'


export default class App extends React.Component {


  componentDidMount = async () => {
    // We need to ask for Notification permissions for ios devices
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (Constants.isDevice && result.status === 'granted') {
        console.log('Notification permissions granted.')
    }
  }



  render() {
    return (

      <WeatherScreen/>
    );
  }
}


