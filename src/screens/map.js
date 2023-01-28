import {View, Text, setTimeout} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
//.doc('1BkHgi1flUtC6obB4dge')
const Map = () => {
  const [members, setMembers] = useState();
  const [timer, settimer] = useState(false);

  // useEffect(() => {
  //   function onResult(QuerySnapshot) {
  //     // console.error(QuerySnapshot._docs);
  //     setMembers(QuerySnapshot._docs);
  //     QuerySnapshot._docs ? settimer(true) : settimer(false);
  //   }
  //   function onError(error) {
  //     console.error('data cant fetch==>', error);
  //   }
  //   firestore().collection('Users').onSnapshot(onResult, onError);
  // }, []);

 
  return (
    <View style={{flex: 2}}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 24.977226,
          longitude: 67.0249347,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{latitude: 24.977226, longitude: 67.0249347}}
          title="Marker 1"
          pinColor="green"
        />
        <Marker
          coordinate={{latitude: 24.977226, longitude: 67.0249358}}
          title="Marker 2"
          pinColor="blue"
        />
        {/* {timer
          ? data.map((members, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: data[index]._data.altitude,
                  longitude: data[index]._data.longitude,
                }}
                title={data[index]._data.name}
                pinColor="pink"
              />
            ))
          : console.log('waiting')} */}
      </MapView>
    </View>
  );
};
export default Map;
