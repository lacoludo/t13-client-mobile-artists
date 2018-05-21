import autobind from "autobind-decorator";
import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { inject, observer } from "mobx-react/native";
import { Constants, LinearGradient } from "expo";

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

  render(): React.Node {
    const { navigation, profileStore } = this.props;
    const { profile } = profileStore;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#5cc0f1", "#d6ebf4", "white"]}
          style={styles.gradient}
        />
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
          <Avatar
            size={avatarSize}
            style={styles.avatar}
            {...profile.picture}
          />
        </View>
      </View>
    );
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
    backgroundColor: "transparent",
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
  }
});
