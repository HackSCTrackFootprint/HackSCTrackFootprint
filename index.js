const express = require('express')
const app = express()
const port = 3000
var cors = require('cors');
var path = require('path');
const axios = require('axios');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/car',(req,res)=>{
 
    axios.post('https://beta2.api.climatiq.io/estimate',{
        headers: { Authorization:'Bearer NBE1MDGYBZ4SVRNCC60ZM2JMCYK3'},
        data: {  "emission_factor": "passenger_vehicle-vehicle_type_black_cab-fuel_source_na-distance_na-engine_size_na",
        "parameters": {
			"passengers": 4,
			"distance": 100,
			"distance_unit": "mi"
        } }  
  }).then(res => console.log(res));


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})