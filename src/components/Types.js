import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import type {
  NavigationNavigatorProps,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";

export type ScreenProps<
  O: {} = {},
  S: {} = NavigationState
> = NavigationNavigatorProps<O, S>;

export type NavigationProps<S: {} = NavigationState> = {
  navigation: NavigationScreenProp<S>
};

export type ScreenParams<P> = ScreenProps<{}, { params: P }>;

export type BaseProps = {
  style?: StyleObj
};
