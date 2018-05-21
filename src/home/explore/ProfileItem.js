import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  TouchableOpacity,
  Image 
} from 'react-native';
import { Text, Theme, Avatar } from "../../components";
import musicians from "../../data/musicians";
import emails from "../../data/email";
import SearchInput from './search/SearchInput';
import { createFilter } from './search/util';

const KEYS_TO_FILTERS = ['skills'];

export default class ProfileItem extends Component{
 constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }
  render() {
    const {onOpenProfile, musician } = this.props
    const filteredEmails = musicians.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <View style={styles.container}>
        <SearchInput 
          onChangeText={(term) => { this.searchUpdated(term) }} 
          style={styles.searchInput}
          placeholder="Type a message to search"
          />

          {filteredEmails.map(musician => {
            return (
              <TouchableOpacity
              onPress={ () => onOpenProfile(musician)}
              >
                <View>
                  <Image
                    source={{ uri: musician.photo }}
                    style={styles.musicianPhoto}
                  />
                  <Text style={styles.musicianName}>{musician.name}</Text>
                    <View style={styles.inlineTextWrap}>
                      {musician.skills.map((skill, index) => (
                        <Text style={styles.musicianSkill}>{skill}</Text>
                      ))}
                    </View>
                </View>
              </TouchableOpacity>
            )
          })}

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
  inlineTextWrap: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  musicianPhoto: {
    width: "98.5%",
    height: 220,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10
  },
  musicianName: {
    color: "#fff",
    fontSize: 22,
    marginLeft: 5
  },
  musicianSkill: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 5,
    marginBottom: 5,
    paddingRight: 5
  },
  searchInput:{
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1,
    backgroundColor: '#ddd'
  }
});




