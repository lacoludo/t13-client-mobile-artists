import React, { Component } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { artists } from "../data/artists";

export default class ArtistsContainer extends Component {
  static navigationOptions = {
    tabBarLabel: "ARTISTS",
    tabBarIcon: () => {
      return (
        <Image
          source={require("../Images/icons/user.png")}
          style={{ width: 20, height: 20 }}
        />
      );
    }
  };

  render() {
    return (
      <View>
        <ScrollView>
          {artists.map((artist, index) => (
            <View>
              <Text>{artist.name}</Text>
              <Image
                source={{ uri: artist.photo }}
                style={{ width: 40, height: 40 }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
