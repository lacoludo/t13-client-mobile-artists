import autobind from "autobind-decorator";
import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Button
} from "react-native";
import { WebBrowser } from "expo";
import { Body, Left, List, ListItem } from "native-base";
import { Feather as Icon } from "@expo/vector-icons";
import { inject, observer } from "mobx-react/native";
import { Constants, LinearGradient } from "expo";

import { musicians } from "../../data/musicians";
import ProfileStore from "../ProfileStore";

import { Text, Avatar, Theme, Images } from "../../components";
import type { ScreenProps } from "../../components/Types";

type InjectedProps = {
  profileStore: ProfileStore
};

@inject("profileStore")
@observer
export default class ProfileComp extends React.Component<
  ScreenProps<> & InjectedProps
> {
  @autobind
  settings() {
    const { profile } = this.props.profileStore;
    this.props.navigation.navigate("Settings", { profile });
  }

  _handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync("https://expo.io");
  };

  render(): React.Node {
    const { navigation, profileStore } = this.props;
    const { profile } = profileStore;
    return <View style={styles.container}>
        <LinearGradient colors={["#232323", "white"]} style={styles.gradient} />
        <View style={styles.header}>
          <Image style={styles.cover} source={Images.cover} />
          <TouchableOpacity onPress={this.settings} style={styles.settings}>
            <View>
              <Icon name="settings" size={25} color="white" />
            </View>
          </TouchableOpacity>
          <View style={styles.title}>
            <Text type="large" style={styles.outline}>
              {profile.outline}
            </Text>
            <Text type="header2" style={styles.name}>
              {profile.name}
            </Text>
          </View>
          <Avatar size={avatarSize} style={styles.avatar} {...profile.picture} />
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
      </View>;
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
