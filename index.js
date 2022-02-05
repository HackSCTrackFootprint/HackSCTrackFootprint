const express = require('express')
const app = express()
const port = 3000
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
        console.log(body);
    }
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/car',(req,res)=>{
    options={
        url: 'https://beta2.api.climatiq.io/estimate',
        method: 'POST',
        headers: headers,
        body: dataString
    };
    dataString=`{
        "emission_factor": "commercial_vehicle-vehicle_type_hgv-fuel_source_bev-engine_size_na-vehicle_age_post_2015-vehicle_weight_gt_10t_lt_12t",
        "parameters": {
			"distance": 100,
			"distance_unit": "mi"
        }
    }`;
    request(options, callback);


})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})