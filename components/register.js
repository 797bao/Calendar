import React, { Component, useState } from "react";

import {
  StyleSheet,
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
  Button,
} from "react-native";
//import { Button } from "react-native-elements";
import { handlePostAjaxResponse } from "./utils/utils";

let nav;
//let [action, setAction] = useState("Login");

export default class RegisterScreen extends Component {
  
  constructor(props) {
    super(props);
    console.log("PROPS " + JSON.stringify(props));
    nav = props.navigation;
  }

  state = {
    username: "",
    password: "",
    token: "",
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Login</Text>
              <TextInput
                onChangeText={this.handleUsernameInput}
                placeholder="Username"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
              />
              <TextInput
                onChangeText={this.handlePasswordInput}
                placeholder="Password"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                secureTextEntry={true}
              />
              <View style={styles.buttonsRow}>
                <Button
                  buttonStyle={styles.loginButton}
                  onPress={() => this.onRegisterPress()}
                  title="Register"
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  onRegisterPress(){
    console.log("here")

  }

  onLoginPress() {
    nav.navigate("App");

    const api = "http://rubyss.com/login/api.php";
    const { username, password } = this.state;
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        req: "login",
        p1: username,
        p2: password,
      }),
    };
    fetch(api, data)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        handlePostAjaxResponse(res);
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleUsernameInput = (text) => {
    this.setState({
      username: text,
    });
  };

  handlePasswordInput = (text) => {
    this.setState({
      password: text,
    });
  };

  showState() {
    const { username, password } = this.state;
    console.log("user", username);
    console.log("password", password);
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    width: "80%",
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonsRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
