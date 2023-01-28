import firestore from '@react-native-firebase/firestore';
import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  setTimeout,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

const Profile = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState('');
  const [mail, setmail] = useState('');
  const [pass, setpass] = useState('');
  const [error, seterror] = useState(null);
  const [chksignin, setchksignin] = useState(true);
  const [loginmail, setloginmail] = useState('');
  const [loginpass, setloginpass] = useState('');
  const [Nlame, setNlame] = useState('')

  const FSignUp = () => {
    seterror('');
    const emailRegex = /^[a-z0-9._%+-]+@gmail\.com$/i;
    console.log(emailRegex.test(mail));
    if (emailRegex.test(mail)) {
      console.log('true');
      if (pass.length >= 6) {
        auth()
          .createUserWithEmailAndPassword(mail, pass)
          .then(() => {
            // console.log('User account created & signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              seterror('auth/email-already-in-use');
            }
            console.error('error');
          });
        async function requestLocationPermission() {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'My App Location Permission',
                message: 'My App needs access to your location',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              Geolocation.getCurrentPosition(
                position => {
                  // console.log(position.coords.latitude);
                  firestore()
                    .collection('Users')
                    .doc(user)
                    .set({
                      name : Nlame,
                      altitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                    })
                    .then(() => {
                      // console.log('User added!');
                    });
                },
                error => {
                  console.log(error);
                },
                {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000},
              );
              console.log('You can use the location');
            } else {
              console.log('Location permission denied');
            }
          } catch (err) {
            console.warn(err);
          }
        }

        requestLocationPermission();
      } else {
        console.log('wrong pass');
        seterror('Invalid Passward !');
      }
    } else {
      console.log('wrong email');
      seterror('Invalid Email !');
    }
  };




  
  // setTimeout(() => {
  //   async function requestLocationPermission() {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         {
  //           title: 'My App Location Permission',
  //           message: 'My App needs access to your location',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         Geolocation.getCurrentPosition(
  //           position => {
  //             console.log(position.coords.latitude);
  //             firestore()
  //               .collection('Users')
  //               .doc(user)
  //               .set({
  //                 altitude: position.coords.latitude,
  //                 longitude: position.coords.longitude,
  //               })
  //               .then(() => {
  //                 console.log('User added!');
  //               });
  //           },
  //           error => {
  //             console.log(error);
  //           },
  //           {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  //         );
  //         console.log('You can use the location');
  //       } else {
  //         console.log('Location permission denied');
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   }

  //   requestLocationPermission();
  // }, 50000);



  function onAuthStateChanged(user) {
    {user ?setUser(user.email):console.log("none")}
    // {user?console.log("see user",user.email):console.log("not found user")}
    // console.log(user)
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) return null;

  const logout = () => {
    auth()
      .signOut()
      .then(() =>
      setUser(''),
      console.log('User signed out!'));
    // async function requestLocationPermission() {
    //   try {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //       {
    //         title: 'My App Location Permission',
    //         message: 'My App needs access to your location',
    //       },
    //     );
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       Geolocation.getCurrentPosition(
    //         position => {
    //           console.log(position);
    //         },
    //         error => {
    //           console.log(error);
    //         },
    //         {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    //       );
    //       console.log('You can use the location');
    //     } else {
    //       console.log('Location permission denied');
    //     }
    //   } catch (err) {
    //     console.warn(err);
    //   }
    // }

    // requestLocationPermission();
  };

  const logins = () => {
    seterror('');
    const emailRegex = /^[a-z0-9._%+-]+@gmail\.com$/i;
    console.log(emailRegex.test(loginmail));
    if (emailRegex.test(loginmail)) {
      console.log('true');
      if (loginpass.length >= 6) {
        auth()
          .signInWithEmailAndPassword(loginmail, loginpass)
          .then(userCredential => {
            var user = userCredential.user;
            console.log(user);
          })
          .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(user);
          });
        async function requestLocationPermission() {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'My App Location Permission',
                message: 'My App needs access to your location',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              Geolocation.getCurrentPosition(
                position => {
                  console.log(position);
                },
                error => {
                  console.log(error);
                },
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
              );
              console.log('You can use the location');
            } else {
              console.log('Location permission denied');
            }
          } catch (err) {
            console.warn(err);
          }
        }

        requestLocationPermission();
      } else {
        console.log('wrong pass');
        seterror('Inavlid Passward !');
      }
    } else {
      console.log('wrong email');
      seterror('Inavlid Email haha!');
    }
  };

  return (
    <>
      {user ? (
        <View
          style={{flex: 10, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flex: 8}}>
            <View
              style={{
                backgroundColor: 'black',
                width: 150,
                height: 150,
                borderRadius: 75,
                marginTop: 50,
              }}></View>
            <Text style={{color: 'black', textAlign: 'center', paddingTop: 30}}>
              Welcome
            </Text>
            <Text style={{color: 'black', textAlign: 'center', paddingTop: 15}}>
              {' '}
              {user ? user : ''}
            </Text>
          </View>
          <View style={{flex: 2, width: '100%', alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                padding: 15,
                backgroundColor: 'gray',
                width: '70%',
                marginTop: 13,
                borderRadius: 5,
                alignItems: 'center',
                borderTopEndRadius: 50,
                borderBottomStartRadius: 50,
              }}
              onPress={logout}>
              <Text style={{color: 'white'}}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {chksignin ? (
            <View
              style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 20,
                  fontWeight: '400',
                  paddingBottom: 25,
                }}>
                {error ? error : ''}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 33,
                  fontWeight: '500',
                  paddingBottom: 30,
                }}>
                Sign Up
              </Text>
              <TextInput
                placeholder="Enter Your Name"
                placeholderTextColor={'gray'}
                backgroundColor="lightgray"
                style={{
                  width: '70%',
                  borderRadius: 5,
                  padding: 8,
                  color: 'gray',
                  color: 'black',
                  backgroundColor: '#f2f2f2',
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                }}
                blurOnSubmit={true}
                onChangeText={t => setNlame(t)}
              />
              <TextInput
                placeholder="Enter Your Email"
                placeholderTextColor={'gray'}
                backgroundColor="lightgray"
                style={{
                  width: '70%',
                  borderRadius: 5,
                  padding: 8,
                  color: 'gray',
                  marginTop: 8,
                  color: 'black',
                  backgroundColor: '#f2f2f2',
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                }}
                onChangeText={t => setmail(t)}
                keyboardType="email-address"
              />
              <TextInput
                placeholder="Enter Your Passward"
                placeholderTextColor={'gray'}
                backgroundColor="lightgray"
                style={{
                  width: '70%',
                  borderRadius: 5,
                  padding: 8,
                  color: 'black',
                  backgroundColor: '#f2f2f2',
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                  marginTop: 8,
                }}
                onChangeText={e => setpass(e)}
                secureTextEntry={true}
              />
              <TouchableOpacity
                onPress={() => {
                  FSignUp();
                }}
                style={{
                  padding: 15,
                  backgroundColor: 'gray',
                  width: '70%',
                  marginTop: 39,
                  borderRadius: 5,
                  borderTopEndRadius: 90,
                  borderBottomStartRadius: 90,
                }}>
                <Text style={{color: 'white', textAlign: 'center'}}>Login</Text>
              </TouchableOpacity>
              <Text style={{color: 'gray', paddingTop: 15}}>
                already have account ?
                <Text
                  onPress={() => setchksignin(false)}
                  style={{fontWeight: 'bold', padding: 200, color: 'black'}}>
                  SignUp
                </Text>
              </Text>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 20,
                  fontWeight: '400',
                  paddingBottom: 25,
                }}>
                {error ? error : ''}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 33,
                  fontWeight: '500',
                  paddingBottom: 30,
                }}>
                Sign In
              </Text>
              <TextInput
                placeholder="Enter Your Email"
                placeholderTextColor={'gray'}
                backgroundColor="lightgray"
                style={{
                  width: '70%',
                  borderRadius: 5,
                  padding: 8,
                  color: 'gray',
                  marginTop: 8,
                  color: 'black',
                  backgroundColor: '#f2f2f2',
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                }}
                onChangeText={t => setloginmail(t)}
                keyboardType="email-address"
              />
              <TextInput
                placeholder="Enter Your Passward"
                placeholderTextColor={'gray'}
                backgroundColor="lightgray"
                style={{
                  width: '70%',
                  borderRadius: 5,
                  padding: 8,
                  color: 'gray',
                  marginTop: 8,
                  color: 'black',
                  backgroundColor: '#f2f2f2',
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                }}
                onChangeText={e => setloginpass(e)}
                secureTextEntry={true}
              />
              <TouchableOpacity
                onPress={() => {
                  logins();
                }}
                style={{
                  padding: 15,
                  backgroundColor: 'gray',
                  width: '70%',
                  marginTop: 13,
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white', textAlign: 'center'}}>Login</Text>
              </TouchableOpacity>
              <Text style={{color: 'gray', paddingTop: 10}}>
                dont have account ? _
                <Text
                  onPress={() => setchksignin(true)}
                  style={{fontWeight: 'bold', color: 'black'}}>
                  Register
                </Text>
              </Text>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default Profile;
