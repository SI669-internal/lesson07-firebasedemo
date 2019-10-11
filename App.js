import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAOFAGqFifSkvI4jRvR8Nq3Dus2JAyvPfQ",
  authDomain: "lesson07-firebasedemo.firebaseapp.com",
  databaseURL: "https://lesson07-firebasedemo.firebaseio.com",
  projectId: "lesson07-firebasedemo",
  storageBucket: "lesson07-firebasedemo.appspot.com",
  messagingSenderId: "1085673325819",
  appId: "1:1085673325819:web:9f32eac784f4117e825c5e"
};


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {currentuser: {firstName: '', lastName: '', birthDate: ' '}};

    firebase.initializeApp(firebaseConfig);
    const dbh = firebase.firestore();
    this.userDocRef = dbh.collection("settings").doc("currentuser");
    this.refreshFromFirebase();
  }

  refreshFromFirebase() {
    this.userDocRef.get().then((doc) => {
      this.setState({currentuser: doc.data()});
    });
  }

  pressMark = () => {
    this.userDocRef.set({firstName: "Mark", lastName: this.state.currentuser.lastName});
    this.refreshFromFirebase();
  };

  pressGroot  = () => {
    this.userDocRef.set({firstName: "Groot", lastName: this.state.currentuser.lastName});
    this.refreshFromFirebase();
  }

  pressNewman = () => {
    this.userDocRef.set({firstName: this.state.currentuser.firstName, lastName: "Newman"});
    this.refreshFromFirebase();
  };

  pressGroot2  = () => {
    this.userDocRef.set({firstName: this.state.currentuser.firstName, lastName: "McGroot"});
    this.refreshFromFirebase();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello {this.state.currentuser.firstName} {this.state.currentuser.lastName} </Text>
        <TouchableOpacity
          onPress={this.pressMark}>
            <Text>I am Mark</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.pressGroot}>
            <Text>I am Groot</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.pressNewman}>
            <Text>I am a Newman</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.pressGroot2}>
            <Text>I am a McGroot</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
