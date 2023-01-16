import {View} from 'react-native';
import MapView from 'react-native-maps';
const Map = () => {
  return (
    <View style={{flex:2}}>
      <MapView
      style={{flex : 1}}
        initialRegion={{
          latitude: 24.97121670929672, 
          longitude: 67.03901531773799,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        />
        </View>
  );
};
export default Map;
