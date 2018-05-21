import * as React from "react";
import { StatusBar, Platform } from "react-native";
import { StyleProvider } from "native-base";
import {
  SwitchNavigator,
  StackNavigator,
  TabNavigator
} from "react-navigation";
import { Font, AppLoading } from "expo";
import { useStrict } from "mobx";
import { Provider, inject } from "mobx-react/native";
import { Feather } from "@expo/vector-icons";

import { Images, Firebase } from "./src/components";
import type { ScreenProps } from "./src/components/Types";

import { Welcome } from "./src/welcome";
import { SignUpName, SignUpEmail, SignUpPassword, Login } from "./src/sign-up";
import {
  Profile,
  Explore,
  HomeTab,
  Settings,
  ProfileStore
} from "./src/home";

import getTheme from "./native-base-theme/components";
import variables from "./native-base-theme/variables/commonColor";

const SFProTextMedium = require("./fonts/SF-Pro-Text-Medium.otf");
const SFProTextHeavy = require("./fonts/SF-Pro-Text-Heavy.otf");
const SFProTextBold = require("./fonts/SF-Pro-Text-Bold.otf");
const SFProTextSemibold = require("./fonts/SF-Pro-Text-Semibold.otf");
const SFProTextRegular = require("./fonts/SF-Pro-Text-Regular.otf");
const SFProTextLight = require("./fonts/SF-Pro-Text-Light.otf");

useStrict(true);

const originalSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(body: string) {
  if (body === "") {
    originalSend.call(this);
  } else {
    originalSend.call(this, body);
  }
};

if (!console.ignoredYellowBox) {
  console.ignoredYellowBox = [];
}
console.ignoredYellowBox.push("Setting a timer");

@inject("profileStore")
class Loading extends React.Component<ScreenProps<>> {
  async componentDidMount(): Promise<void> {
    const { navigation, profileStore } = this.props;
    await Loading.loadStaticResources();
    Firebase.init();
    Firebase.auth.onAuthStateChanged(user => {
      const isUserAuthenticated = !!user;
      if (isUserAuthenticated) {
        const { uid } = Firebase.auth.currentUser;
        profileStore.init();
        navigation.navigate("Home");
      } else {
        navigation.navigate("Welcome");
      }
    });
  }

  static async loadStaticResources(): Promise<void> {
    try {
      const images = Images.downloadAsync();
      const fonts = Font.loadAsync({
        "SFProText-Medium": SFProTextMedium,
        "SFProText-Heavy": SFProTextHeavy,
        "SFProText-Bold": SFProTextBold,
        "SFProText-Semibold": SFProTextSemibold,
        "SFProText-Regular": SFProTextRegular,
        "SFProText-Light": SFProTextLight
      });
      const icons = Font.loadAsync(Feather.font);
      await Promise.all([...images, fonts, icons]);
    } catch (error) {
      console.error(error);
    }
  }

  render(): React.Node {
    return <AppLoading />;
  }
}

export default class App extends React.Component<{}> {
  profileStore = new ProfileStore();

  componentDidMount() {
    StatusBar.setBarStyle("dark-content");
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("white");
    }
  }

  render(): React.Node {
    const { profileStore } = this;
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider {...{ profileStore }}>
          <AppNavigator onNavigationStateChange={() => undefined} />
        </Provider>
      </StyleProvider>
    );
  }
}

const StackNavigatorOptions = {
  headerMode: "none",
  cardStyle: {
    backgroundColor: "#232323"
  }
};

const ExploreNavigator = StackNavigator(
  {
    Explore: { screen: Explore }
  },
  StackNavigatorOptions
);

const ProfileNavigator = StackNavigator(
  {
    Profile: { screen: Profile },
    Settings: { screen: Settings }
  },
  StackNavigatorOptions
);

const HomeTabs = TabNavigator(
  {
    Explore: { screen: ExploreNavigator },
    Profile: { screen: ProfileNavigator }
  },
  {
    animationEnabled: true,
    tabBarComponent: HomeTab,
    tabBarPosition: "bottom",
    swipeEnabled: false
  }
);

const HomeNavigator = SwitchNavigator(
  {
    Home: { screen: HomeTabs }
  },
  StackNavigatorOptions
);

const SignUpNavigator = StackNavigator(
  {
    SignUp: { screen: SignUpName },
    SignUpEmail: { screen: SignUpEmail },
    SignUpPassword: { screen: SignUpPassword }
  },
  StackNavigatorOptions
);

const AppNavigator = SwitchNavigator(
  {
    Loading: { screen: Loading },
    Welcome: { screen: Welcome },
    Login: { screen: Login },
    SignUp: { screen: SignUpNavigator },
    Home: { screen: HomeNavigator }
  },
  StackNavigatorOptions
);

export { AppNavigator };


//Hide this warning info ^^
console.disableYellowBox = true; 