const axios = require('axios');


export const getWeather = (city) => {

    return axios.get(`https://vejr.eu/api.php?location=${city}&degree=C`)
        .then((res) => {
            return res.data.CurrentData
        })
        .catch((err) => {
            console.log(err)
        })
}