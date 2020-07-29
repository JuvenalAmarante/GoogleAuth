/* eslint-disable curly */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [user, setUser] = useState();
  const [login, setLogin] = useState(true);

  GoogleSignin.configure({
    webClientId:
      '753702414710-irfn3g5bjjeutpvc4ssl3f8bomrbaqo2.apps.googleusercontent.com',
  });

  async function onLogin() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
      auth().onAuthStateChanged(onAuthStateChanged);
      // onAuthStateChanged(data);
    } catch (e) {
      console.warn(e);
    }
  }

  async function onLogout() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      if (!login) setLogin(true);
      setUser();
    } catch (e) {
      console.warn(e);
    }
  }

  function onAuthStateChanged(data) {
    setUser(data);
    if (login) setLogin(false);
  }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          {user && (
            <Image
              source={{
                uri: user.photoURL,
              }}
              style={styles.image}
            />
          )}
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.sectionTitle}>
            {user ? user.displayName : 'Seja Bem vindo!'}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.sectionTitle}>
            {user && user.email}
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <GoogleSigninButton
            style={styles.buttonLogin}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={onLogin}
            disabled={!login}
          />
          <TouchableOpacity style={styles.buttonLogout} onPress={onLogout}>
            <Text style={styles.textButton}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
  },
  buttonLogin: {
    height: 70,
    width: 'auto',
  },
  buttonLogout: {
    backgroundColor: '#c41010',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 'auto',
    marginHorizontal: 5,
  },
  textButton: {
    color: 'white',
  },
  image: {
    resizeMode: 'center',
    borderRadius: 50,
    height: 100,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    maxWidth: 500,
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
