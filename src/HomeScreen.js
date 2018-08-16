import React, { Component } from "react";
import { Button, Image, View } from "react-native";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex:1,flexDirection: "column"}}>
        <Button
          title="Go to Jane's profile"
          onPress={() => navigate("Profile")}
        />        
      </View>
    );
  }
}

export default HomeScreen;
