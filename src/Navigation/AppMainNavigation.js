import React from "react";
import { TabNavigator, TabBarBottom } from "react-navigation";
import ArtistsContainer from "../Containers/ArtistsContainer";
import ProfileContainer from "../Containers/ProfileContainer";

const AppMainNavigator = TabNavigator(
  {
    Artists: { screen: ArtistsContainer },
    Profile: { screen: ProfileContainer }
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontWeight: "600",
        marginBottom: 5
      },
      style: {
        backgroundColor: "#0098c1",
        borderTopWidth: 1,
        borderColor: "#3f101c"
      },
      activeTintColor: "#fff"
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom"
  }
);

export default AppMainNavigator;
