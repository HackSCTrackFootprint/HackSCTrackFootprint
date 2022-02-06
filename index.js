const express = require('express')
const app = express()
const port = 80
var cors = require('cors');
var path = require('path');
const axios = require('axios');
app.use(cors());
var request = require('request');

var headers = {
    'Authorization': 'Bearer NBE1MDGYBZ4SVRNCC60ZM2JMCYK3'
};

var dataString ;

var options;

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(JSON.parse(body)['co2e']);
        console.log(typeof body);
        // response.send(body['co2e']);
    }
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})
// var axios = require('axios');

var config ;

app.get('/distance',(req,res)=>{
    req.query.from =  "40.6655101,-73.89188969999998";
    req.query.to = "40.659569,-73.933783";
    config ={
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${req.query.from}&destinations=${req.query.to}&key=AIzaSyDeucYZPT7OmqoWzK-I0eeXMp8lNddPYHU`,
        headers: { }
      };
    axios(config)
    .then(function (response) {
        var obj = JSON.parse(JSON.stringify(response.data));
      console.log(JSON.stringify(obj['rows'][0]['elements'][0]['distance']['text']));
     // res.send(JSON.stringify(obj['rows'][0]['elements'][0]['distance']['text']));
    })
    .catch(function (error) {
      console.log(error);
    });

})


app.get('/api/car',(req,res)=>{
    req.query.distance = 1000;
    dataString=`{
        "emission_factor": "commercial_vehicle-vehicle_type_hgv-fuel_source_bev-engine_size_na-vehicle_age_post_2015-vehicle_weight_gt_10t_lt_12t",
        "parameters": {
			"distance": ${req.query.distance},
			"distance_unit": "mi"
        }
    }`;
    options={
        url: 'https://beta2.api.climatiq.io/estimate',
        method: 'POST',
        headers: headers,
        body: dataString
    };
    
    request(options, callback);


})
app.get('/api/train',(req,res)=>{
  
  req.query.distance = 1000;
  dataString=`{
      "emission_factor": "passenger_train-route_type_commuter_rail-fuel_source_na",
      "parameters": {
        "passengers": 1,
    "distance": ${req.query.distance},
    "distance_unit": "mi"
      }
  }`;
  options={
      url: 'https://beta2.api.climatiq.io/estimate',
      method: 'POST',
      headers: headers,
      body: dataString
  };
  
  request(options, callback);


})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})