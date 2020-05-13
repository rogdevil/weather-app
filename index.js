const request = require("request");
var prompts = require('prompts');
const coordinateRequest = require("./playground/coordinateRequest");
const addressRequest = require("./playground/addressRequest");

//here we are taking input of address from the user
for (let i = 0; i < 2; i++) {


    let address;
    (async () => {
        const response = await prompts({
            type: 'text',
            name: 'Address',
            message: 'Enter a valid pin code or Address-',
        });
        address = encodeURIComponent(response.Address);
        console.log(response.Address);
        addressRequest.addressRequest(address); // => { value: 24 }
    })();



}