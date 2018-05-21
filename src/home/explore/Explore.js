import autobind from "autobind-decorator";
import * as React from "react";
import moment from "moment";
import {
  StyleSheet,
  View,
  Animated,
  SafeAreaView,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  Image,
  ImageBackground
} from "react-native";
import { inject, observer } from "mobx-react/native";

import ProfileStore from "../ProfileStore";

import { Text, Theme, Avatar } from "../../components";
import type { ScreenProps } from "../../components/Types";

import { artists } from "../../data/artists";

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

type ExploreState = {
  scrollAnimation: Animated.Value
};

type InjectedProps = {
  profileStore: ProfileStore
};

@inject("profileStore")
@observer
export default class Explore extends React.Component<
  ScreenProps<> & InjectedProps,
  ExploreState
> {
  state = {
    scrollAnimation: new Animated.Value(0)
  };

  @autobind
  profile() {
    this.props.navigation.navigate("Profile");
  }

  render(): React.Node {
    const { profileStore, navigation } = this.props;
    const { scrollAnimation } = this.state;
    const { profile } = profileStore;
    const opacity = scrollAnimation.interpolate({
      inputRange: [0, 60],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });
    const fontSize = scrollAnimation.interpolate({
      inputRange: [0, 60],
      outputRange: [36, 24],
      extrapolate: "clamp"
    });
    const height = scrollAnimation.interpolate({
      inputRange: [0, 60],
      outputRange: Platform.OS === "android" ? [70, 70] : [100, 60],
      extrapolate: "clamp"
    });
    const marginTop = scrollAnimation.interpolate({
      inputRange: [0, 60],
      outputRange: [24, 0],
      extrapolate: "clamp"
    });
    const shadowOpacity = scrollAnimation.interpolate({
      inputRange: [0, 60],
      outputRange: [0, 0.25],
      extrapolate: "clamp"
    });
    return (
      <View style={styles.container}>
        <AnimatedSafeAreaView style={[styles.header, { shadowOpacity }]}>
          <Animated.View style={[styles.innerHeader, { height }]}>
            <View>
              <AnimatedText type="header2" style={{ fontSize, marginTop }}>
                T13
              </AnimatedText>
            </View>
          </Animated.View>
        </AnimatedSafeAreaView>
        <ScrollView>
          {artists.map((artist, index) => (
            <View>
              <Image
                source={{ uri: artist.photo }}
                style={{
                  width: "98.5%",
                  height: 220,
                  margin: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 15,
                  marginBottom: 10,
                }}
              >
              </Image>
              <Text
                style={{
                  backgroundColor: "rgba(0,0,0,0)",
                  color: "#fff",
                  fontSize: 23,
                  marginLeft: 5
                }}
              >
                {artist.name}
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {artist.skills.map((skill, index) => (
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    marginLeft: 5,
                    marginBottom: 5,
                    paddingRight: 5
                  }}
                >
                  {skill}
                </Text>
              ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 8,
    zIndex: 10000
  },
  innerHeader: {
    marginHorizontal: Theme.spacing.base,
    marginVertical: Theme.spacing.tiny,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  newPosts: {
    position: "absolute",
    top: 0
  }
});
