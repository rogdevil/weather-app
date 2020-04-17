const request = require("request");
const yargs = require("yargs");
const coordinateRequest = require("./playground/coordinateRequest");
const addressRequest = require("./playground/addressRequest");
argv = yargs
    .options({
        a: {
            alias: "address",
            describe: "address to fetch weather api",
            string: true,
        },
        lng: {
            alias: "longitude",
            describe: "enter longitude (optional)",
            number: true,
        },
        ltd: {
            alias: "lattitude",
            describe: "enter lattitude (optional)",
            number: true,
        },
    })
    .help()
    .alias("help", "h").argv;

//console.log(argv);

let address = encodeURIComponent(argv.a);
let Longitude = argv.lng;
let Lattitude = argv.ltd;
// console.log(Longitude);
// console.log(Lattitude);
if (argv.a === undefined && argv.ltd == undefined && argv.lng === undefined) {
    console.log(
        "either enter the address or the corrdinates of the required palce"
    );
} else if (argv.address == undefined) {
    coordinateRequest.coordinateRequest(Longitude, Lattitude);
} else {
    addressRequest.addressRequest(address);
}
