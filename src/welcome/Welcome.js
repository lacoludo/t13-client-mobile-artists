import autobind from "autobind-decorator";
import * as React from "react";
import {
  StyleSheet,
  Dimensions,
  Linking
} from "react-native";

import {
  Text,
  Button,
  Container,
  Theme,
  AnimatedView,
  Firebase,
  serializeException
} from "../components";
import type { ScreenProps } from "../components/Types";

export default class Welcome extends React.Component<ScreenProps<>> {
  @autobind
  signUp() {
    this.props.navigation.navigate("SignUp");
  }

  @autobind
  login() {
    this.props.navigation.navigate("Login");
  }

  render(): React.Node {
    return (
      <Container style={styles.root} gutter={2}>
        <AnimatedView style={styles.container}>
          <Text type="header1" style={styles.header}>
            T13
          </Text>
        </AnimatedView>
        <AnimatedView style={styles.container} delay={600} duration={300}>
          <Button label="Login" onPress={this.login} full primary />
          <Button label="Login Anonymously" onPress={loginAnonymously} full />
          <Button label="Sign Up" onPress={this.signUp} full />
        </AnimatedView>
      </Container>
    );
  }
}

const loginAnonymously = async (): Promise<void> => {
  try {
    await Firebase.auth.signInAnonymously();
  } catch (e) {
    alert(serializeException(e));
  }
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#232323"
  },
  container: {
    alignSelf: "stretch"
  },
  header: {
    textAlign: "center",
    marginTop: Theme.spacing.base * 2,
    marginBottom: Theme.spacing.base * 2,
    color: Theme.palette.white
  },
  framer: {
    position: "absolute",
    bottom: Theme.spacing.tiny,
    width
  },
  framerText: {
    textAlign: "center",
    fontSize: 12
  }
});
