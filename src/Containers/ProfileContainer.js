import React, { Component } from 'react'
import { 
    Text, 
    View,
    Image 
} from 'react-native'

export default class ProfileContainer extends Component {

  static navigationOptions = {
    tabBarLabel: 'PROFILE',
    tabBarIcon: () => {
        return <Image source={require('../Images/icons/user.png')} style= {{width:20, height:20}}/>
    }
  }
  render() {
    return (
      <View>
        <Text> This is profile container </Text>
      </View>
    )
  }
}
