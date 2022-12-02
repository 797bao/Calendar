import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import LoginScreen from "react-native-login-screen";

const Login = (props) => {
    return (
    <SafeAreaView> 
        <LoginScreen
            logoImageSource={require("../assets/adaptive-icon.png")}
            onLoginPress={() => {}}
            onSignupPress={() => {}}
            onEmailChange={() => {}}
            onPasswordChange={() => {}}
        />
    </SafeAreaView>
    )
}

export default Login;

