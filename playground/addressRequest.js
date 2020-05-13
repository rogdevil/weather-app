const request = require("request");

let addressRequest = (address) => {
    request({
            url: `https://geocode.search.hereapi.com/v1/geocode?q=${address}&limit=5&apiKey=xwqzui1BYBZZXx2JdbO5gZEy_T5ZXN6eVwdYyt9nXCE`,
            json: true,
        },
        function(error, response, body) {
            if (body.items[0] == undefined)
                console.error("you entered a unknown address")
            let Lattitude = body.items[0].position.lat;
            let Longitude = body.items[0].position.lng;
            // console.log(JSON.stringify(body, undefined, 4));
            if (body.items[0] === undefined) {
                console.log("The address you provided does not exist");
            } else if (error) {
                console.log(
                    "unable to reach the server please check your internet connection"
                );
            } else {

                // use of translation api to translate the address of various countries to english


                let addr = body.items[0].title;

                var options = {
                    method: 'POST',
                    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect',
                    headers: {
                        'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
                        'x-rapidapi-key': '5de5cb5d74mshdf596aee5f99b98p11d49djsn2d113dcca3b5',
                        'content-type': 'application/x-www-form-urlencoded',
                        useQueryString: true
                    },
                    form: { q: addr }
                };

                request(options, function(error, response, body) {
                    if (error) throw new Error(error);
                    let bodydata = JSON.parse(body);
                    // console.log("body data of of detected language is", bodydata);
                    let languageCode = bodydata.data.detections[0][0].language;
                    // console.log(typeof languageCode);
                    if (languageCode == "en") {
                        console.log(`Address: ${addr}`);
                        //console.log(`Longitude: ${body.items[0].position.lng}`);
                        //console.log(`Lattitude: ${body.items[0].position.lat}`);

                        //here is our request for weather condition
                        request({
                                url: `https://api.openweathermap.org/data/2.5/weather?lat=${Lattitude}&lon=${Longitude}&appid=151424fbe812fef9072439933e047003`,
                                json: true,
                            },
                            (body, response, error) => {
                                let temprature = response.body.main.temp - 273;
                                let humidity = response.body.main.humidity;
                                let description = response.body.weather.description;
                                let winSpeed = response.body.wind.speed;

                                // console.log(JSON.stringify(response, undefined, 4));
                                console.log(description);
                                console.log(`It feels like: ${temprature} Degree`);
                                console.log(`Current Humidity: ${humidity}`);
                                console.log(
                                    `Current Wind Speed: ${winSpeed} meter/sec`
                                );
                                if (response.body.rain) {
                                    let rain = JSON.stringify(response.body.rain["3h"]);
                                    console.log(`Rain in last 3 hours: ${rain} mm`);
                                } else {
                                    console.log("There is no rain in last 3 hours");
                                }
                            }
                        );
                    } else {
                        var options = {
                            method: 'POST',
                            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
                            headers: {
                                'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
                                'x-rapidapi-key': '5de5cb5d74mshdf596aee5f99b98p11d49djsn2d113dcca3b5',
                                'content-type': 'application/x-www-form-urlencoded',
                                useQueryString: true
                            },
                            form: { source: languageCode, q: addr, target: 'en' }
                        };

                        request(options, function(error, response, body) {
                            if (error) throw new Error(error);

                            let bodyData = JSON.parse(body);
                            // console.log("body data of translated address is", bodyData);
                            let translatedAddress = bodyData.data.translations[0].translatedText;
                            addr = translatedAddress;


                            console.log(`Address: ${addr}`);
                            //console.log(`Longitude: ${body.items[0].position.lng}`);
                            //console.log(`Lattitude: ${body.items[0].position.lat}`);

                            //here is our request for weather condition
                            request({
                                    url: `https://api.openweathermap.org/data/2.5/weather?lat=${Lattitude}&lon=${Longitude}&appid=151424fbe812fef9072439933e047003`,
                                    json: true,
                                },
                                (body, response, error) => {
                                    let temprature = response.body.main.temp - 273;
                                    let humidity = response.body.main.humidity;
                                    let description = response.body.weather.description;
                                    let winSpeed = response.body.wind.speed;

                                    // console.log(JSON.stringify(response, undefined, 4));
                                    console.log(description);
                                    console.log(`It feels like: ${temprature} Degree`);
                                    console.log(`Current Humidity: ${humidity}`);
                                    console.log(
                                        `Current Wind Speed: ${winSpeed} meter/sec`
                                    );
                                    if (response.body.rain) {
                                        let rain = JSON.stringify(response.body.rain["3h"]);
                                        console.log(`Rain in last 3 hours: ${rain} mm`);
                                    } else {
                                        console.log("There is no rain in last 3 hours");
                                    }
                                }
                            );
                        });
                    }



                });
            }
        }
    );
};

module.exports.addressRequest = addressRequest;