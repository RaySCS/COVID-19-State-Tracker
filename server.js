const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const app = express()


// const fetch = require("node-fetch");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')


app.get('/', function (req, res) {
    // res.render('index');
    res.render('index', {holdInfo: null, error: null});
})

var obj;
var userInp = "";
let allUSStatesSpelledOutArray = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", " ", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"]
let allUSStatesArrayAcronym = ['AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO','MP', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY']

app.post('/', function (req, res) {
    // res.render('index');
    console.log(req.body.city);
    userInp = req.body.city;

    let url = `https://covidtracking.com/api/states`

    request(url, function (err, response, body) {
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let allStatesJSON = JSON.parse(body)
            console.log(allStatesJSON)
            var indexInJSON = -1;
            for(let x=0;x<allUSStatesSpelledOutArray.length;x++){
                if(userInp == allUSStatesSpelledOutArray[x] || userInp == allUSStatesArrayAcronym[x]){
                    indexInJSON = x;
                }
            }
            console.log("the latest state")
            console.log(allStatesJSON[indexInJSON])
            var currentState = allStatesJSON[indexInJSON]

            //all setting the ejs below
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            res.render('index', {holdInfoDate: "Information As of " + today, holdInfoState: allUSStatesSpelledOutArray[indexInJSON], holdInfoTotalPositiveCases: currentState['positive'], holdInfoTotalNegativeCases: currentState['negative'], holdInfoCitizensHospitalized: currentState['hospitalizedCurrently'], holdInfoCitizensICU: currentState['inIcuCurrently'], holdInfoCitizensOnVentilator: currentState['onVentilatorCurrently'], holdInfoCitizensDeaths: currentState['deathConfirmed'], holdInfoCitizensDeathsIncreaseToday: currentState['deathIncrease'], error: null});

        }
    });

    // var requestOptions = {
    //     method: 'GET',
    //     redirect: 'follow'
    // };
    //
    // fetch("https://covidtracking.com/api/states", requestOptions)
    //     .then(response => response.json())
    //     .then(
    //         result => obj = result
    //     )
    //     .then(() => console.log(obj))
    //     .then(() => getInfo(res))
    //     .catch(error => console.log('error', error));


})

app.listen(process.env.PORT || 4000)

// var indexInJSON = -1;
// function getInfo(res){
//     //This function runs once the JSON async request is fufilled through the .then
//     console.log("newestt")
//     console.log(obj[0])
//
//
//     //Process which state
//     for(let x=0;x<allUSStatesSpelledOutArray.length;x++){
//         if(userInp == allUSStatesSpelledOutArray[x] || userInp == allUSStatesArrayAcronym[x]){
//             indexInJSON = x;
//         }
//     }
//     console.log("State inputted one")
//     console.log(obj[indexInJSON])
//     res.render('index', {holdInfo: obj[indexInJSON], error: null});
//
// }