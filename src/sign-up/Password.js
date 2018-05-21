import autobind from "autobind-decorator";
import * as React from "react";

import { TextField, Firebase } from "../components";

import SignUpStore from "./SignUpStore";
import SignUpContainer from "./SignUpContainer";

import type { NavigationProps } from "../components/Types";
import type { Profile } from "../components/Model";

type PasswordState = {
  password: string,
  loading: boolean
};

export default class Password extends React.Component<
  NavigationProps<*>,
  PasswordState
> {
  state = {
    password: "",
    loading: false
  };

  @autobind
  setPassword(password: string) {
    this.setState({ password });
  }

  @autobind
  async next(): Promise<void> {
    const { password } = this.state;
    const { email, displayName } = SignUpStore;
    try {
      if (password === "") {
        throw new Error("Please provide a password.");
      }
      this.setState({ loading: true });
      const user = await Firebase.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const profile: Profile = {
        name: displayName,
        outline: "React Native",
        picture: {
          uri:
            "https://media.licdn.com/dms/image/C4E03AQHZ5kAxawJlog/profile-displayphoto-shrink_200_200/0?e=1531958400&v=beta&t=JQZ9KK4xOZp2gWS27bFJQcBcYsYdGxjO9-4tYQz2b_Q",
          preview:
            "data:image/gif;base64,R0lGODlhAQABAPAAAKyhmP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
        }
      };
      await Firebase.firestore
        .collection("users")
        .doc(user.uid)
        .set(profile);
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  }

  render(): React.Node {
    const { navigation } = this.props;
    const { loading } = this.state;
    return (
      <SignUpContainer
        title="Your Password"
        subtitle="Stay Safe"
        next={this.next}
        {...{ navigation, loading }}
      >
        <TextField
          secureTextEntry
          placeholder="Password"
          contrast
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="go"
          onSubmitEditing={this.next}
          onChangeText={this.setPassword}
        />
      </SignUpContainer>
    );
  }
}
