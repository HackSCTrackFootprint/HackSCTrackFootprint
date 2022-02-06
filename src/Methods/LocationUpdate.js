import React, { useState, useEffect } from 'react';
import { Button, Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App(props) {
  const [location, setLocation] = useState(null);
  const [prevLocation, setPrevLocation] = useState(null);
  const [distance, setDistance] = useState(0);
  const [totalDis, setTotalDis] = useState(0);
  const [perEmission, setEmission] = useState(0);
  const [totalEmission, setTotalEmission] = useState(0);
  const getLocation = async () => {
    let l = await Location.getCurrentPositionAsync({});
    setPrevLocation(location)
    setLocation(l)
    try{
      if(prevLocation){
        console.log(prevLocation['coords']['latitude']);
    const res = await axios.get(`http://localhost:5000/distance?from=${prevLocation['coords']['latitude']},${location['coords']['longitude']}&to=${location['coords']['latitude']},${location['coords']['longitude']}`)
   
    const resultDistance  = parseInt(res.data.distance.substr(0,res.data.distance.length-2));
    setDistance(resultDistance);
    setTotalDis(totalDis+resultDistance);
    console.log(resultDistance);
      }
      if(distance){
        let emissionData;
        if(!props || props.vehicle == 'car'){
           emissionData= await axios.get(`http://localhost:5000/api/car?distance=${distance}`)
        }else{
           emissionData = await axios.get(`http://localhost:5000/api/train?distance=${distance}`)
        }
        console.log(emissionData.data);
        const emission1  = emissionData.data.emission;
        
        setEmission(emission1);
        setTotalEmission(totalEmission+emission1);
      }
    }catch(e){
        console.error(e);
    }
  }
  
  let text = JSON.stringify(location);

  return (
    <View>
      <Text>{text}</Text>
      <Button title='Refresh' onPress={getLocation}></Button>
      <Text>distance:{distance}</Text>
      <Text>total distance:{totalDis}</Text>

      <Text>emission:{perEmission}</Text>
      <Text>total emission:{totalEmission}</Text>
      <Button title='car' vehicle='car' onPress={getLocation}></Button>
      <Button title='train' vehicle='train' onPress={getLocation}></Button>
     
    </View>

  );
}