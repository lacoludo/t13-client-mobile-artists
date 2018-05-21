import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
    Button
  } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { Body, Left, List, ListItem } from "native-base";
import { Constants, LinearGradient } from "expo";

import { Text, Avatar, Theme, Images } from "../../components";

export default class publicContainer extends Component {
    static navigationOptions = {
        tabBarLabel: "ARTISTS",
        tabBarIcon: () => {
          return (
            <Image
              source={require("../../Images/icons/user.png")}
              style={{ width: 20, height: 20 }}
            />
          );
        }
      };
    
  render() {
      const { params } = this.props.navigation.state
    return (
        <View style={styles.container}>
        <LinearGradient colors={["#232323", "white"]} style={styles.gradient} />
        <View style={styles.header}>
          <Image style={styles.cover} source={ {uri:params.musician.photo} } />
          <TouchableOpacity style={styles.settings}>
            <View>
              <Icon name="settings" size={25} color="white" />
            </View>
          </TouchableOpacity>
          <View style={styles.title}>
            <Text type="large" style={styles.outline}>
                {params.musician.name}
            </Text>
            <Text type="header2" style={styles.name}>
            {params.musician.skills.map((skill, index) => (
              <Text style={styles.musicianSkill}>{skill}</Text>
            ))}
            </Text>
          </View>
          <Avatar size={avatarSize} style={styles.avatar} />
        </View>
        <ScrollView>
          <View style={styles.padding}>
            <List>
              <ListItem icon>
                <Left>
                  <Icon name="map-pin" size={25} color="white" />
                </Left>
                <Body>
                  <Text style={styles.textColor}>United Kingdom</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Icon name="star" size={25} color="white" />
                </Left>
                <Body>
                  <Text style={styles.textColor}>Skills</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Icon name="video" size={25} color="white" />
                </Left>
                <Body>
                  <Text style={styles.textColor}>YouTube</Text>
                  {/* <Button
                    title="YouTube"
                    onPress={this._handleOpenWithWebBrowser}
                    style={styles.button}
                  /> */}
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Icon name="headphones" size={25} color="white" />
                </Left>
                <Body>
                  <Text style={styles.textColor}>SoundCloud</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Icon name="phone" size={25} color="white" />
                </Left>
                <Body>
                  <Text style={styles.textColor}>+00 01 23 45 67 89</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Icon name="mail" size={25} color="white" />
                </Left>
                <Body>
                  <Text style={styles.textColor}>email@email.email</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Icon name="facebook" size={25} color="white" />
                </Left>
                <Body>
                  <Text style={styles.textColor}>Facebook</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Icon name="instagram" size={25} color="white" />
                </Left>
                <Body>
                  <Text style={styles.textColor}>Instagram</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Icon name="twitter" size={25} color="white" />
                </Left>
                <Body>
                  <Text style={styles.textColor}>Twitter</Text>
                </Body>
              </ListItem>
            </List>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const avatarSize = 100;
const { width } = Dimensions.get("window");
const { statusBarHeight } = Constants;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: width
  },
  header: {
    marginBottom: avatarSize * 0.5 + Theme.spacing.small
  },
  cover: {
    width,
    height: width
  },
  avatar: {
    position: "absolute",
    right: Theme.spacing.small,
    bottom: -avatarSize * 0.5
  },
  settings: {
    position: "absolute",
    top: statusBarHeight + Theme.spacing.small,
    right: Theme.spacing.base,
    zIndex: 10000
  },
  title: {
    position: "absolute",
    left: Theme.spacing.small,
    bottom: 50 + Theme.spacing.small
  },
  outline: {
    color: "rgba(255, 255, 255, 0.8)"
  },
  name: {
    color: "white"
  },
  textColor: {
    color: "#fff"
  },
  button: {
    backgroundColor: "#232323"
  },
  padding: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15
  }
});