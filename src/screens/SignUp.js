import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, TextInput} from 'react-native';

const SignUpScreen = () => {
  const [mail, setmail] = useState('');
  const [pass, setpass] = useState('');
  const [error, seterror] = useState(null);
  const [chksignin, setchksignin] = useState(true);
  const [loginmail, setloginmail] = useState('');
  const [loginpass, setloginpass] = useState('');
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const logins = () => {
    const emailRegex = /^[a-z0-9._%+-]+@gmail\.com$/i;
    console.log(emailRegex.test(loginmail));
    if (emailRegex.test(mail)) {
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
      } else {
        console.log('wrong pass');
      }
    } else {
      console.log('wrong email');
    }
  };
  const FSignUp = () => {
    const emailRegex = /^[a-z0-9._%+-]+@gmail\.com$/i;
    console.log(emailRegex.test(mail));
    if (emailRegex.test(mail)) {
      console.log('true');
      if (pass.length >= 6) {
        auth()
          .createUserWithEmailAndPassword(mail, pass)
          .then(() => {
            console.log('User account created & signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              seterror('auth/email-already-in-use');
            }
            console.error('error');
          });
      } else {
        console.log('wrong pass');
      }
    } else {
      console.log('wrong email');
    }
  };

  return chksignin ? (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder="Enyour Your Name"
          placeholderTextColor={'gray'}
          backgroundColor="lightgray"
          style={{width: '70%', borderRadius: 5, padding: 8, color: 'gray'}}
          blurOnSubmit={true}
        />
        <TextInput
          placeholder="Enyour Your Email"
          placeholderTextColor={'gray'}
          backgroundColor="lightgray"
          style={{
            width: '70%',
            borderRadius: 5,
            padding: 8,
            color: 'gray',
            marginTop: 8,
          }}
          onChangeText={t => setmail(t)}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Enyour Your Passward"
          placeholderTextColor={'gray'}
          backgroundColor="lightgray"
          style={{
            width: '70%',
            borderRadius: 5,
            padding: 8,
            color: 'gray',
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
            marginTop: 13,
            borderRadius: 5,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>Login</Text>
        </TouchableOpacity>
        <Text style={{color: 'black'}}>
          already have account
          <Text
            onPress={() => setchksignin(false)}
            style={{fontWeight: 'bold', padding: 200, color: 'red'}}>
            SignUp
          </Text>
        </Text>
      </View>
    </>
  ) : (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder="Enyour Your Email"
          placeholderTextColor={'gray'}
          backgroundColor="lightgray"
          style={{
            width: '70%',
            borderRadius: 5,
            padding: 8,
            color: 'gray',
            marginTop: 8,
          }}
          onChangeText={t => setloginmail(t)}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Enyour Your Passward"
          placeholderTextColor={'gray'}
          backgroundColor="lightgray"
          style={{
            width: '70%',
            borderRadius: 5,
            padding: 8,
            color: 'gray',
            marginTop: 8,
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
        <Text style={{color: 'black'}}>
          dont have account
          <Text onPress={() => setchksignin(true)} style={{fontWeight: 'bold'}}>
            register
          </Text>
        </Text>
      </View>
    </>
  );
};

export default SignUpScreen;
