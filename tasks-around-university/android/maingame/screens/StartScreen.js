import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Auth} from '../../core/auth/auth';
/*Stylesheets*/
import StartScreenStyles from '../styles/StartScreenStyles';

import { Actions } from 'react-native-router-flux';

export default class StartScreen extends React.Component {
  state = {
    username: '',
    groupname: '',
  };

   async joinGroup(){
    var succeed = await Auth.fetch_or_create_user(this.state.username);
    if(succeed) {
      succeed = await Auth.join_group(this.state.groupname);
      if(succeed) {
        alert("joined group");
        //#TODO message here?
        Actions.push_the_buttons();
      } else {
        //#TODO auth error message
        alert("error when joining the group");
      }
    } else {
      //#TODO overall error message
      alert("Error when joining group");
    }
  }
  createGroup() {
    //#TODO this should be done (how?)
    console.log('Luo Ryhmä: ' + this.state.groupname);
  }

  render() {
    return (
      <View style={StartScreenStyles.container}>
        <Image
          source={require('../../assets/images/tay.jpg')}
          style={StartScreenStyles.backgroundImage}
          blurRadius={1}
        />
        <View style={StartScreenStyles.logo}>
          <Text style={StartScreenStyles.logoText}>
            T3-Game
          </Text>
        </View>
        <Text style={StartScreenStyles.smallText}>
          Aseta käyttäjänimi ja ryhmän nimi
        </Text>
        <View style={StartScreenStyles.inputContainer}>
          <View style={StartScreenStyles.iconWrap}><Icon name="user" size={24} style={StartScreenStyles.inputIcon} /></View>
          <TextInput
            label='Käyttäjänimi'
            value={this.state.username}
            onChangeText={text => this.setState({username:text})}
            style={StartScreenStyles.textInput}
          />
        </View>
        <View style={StartScreenStyles.inputContainer}>
          <View style={StartScreenStyles.iconWrap}><Icon name="group" size={24} style={StartScreenStyles.inputIcon} /></View>
          <TextInput
            label='Ryhmän nimi'
            value={this.state.groupname}
            onChangeText={text => this.setState({groupname:text})}
            style={StartScreenStyles.textInput}
          />
        </View>
        <Button mode="contained" style={[StartScreenStyles.button, StartScreenStyles.violetButton, StartScreenStyles.firstButton]} onPress={() => this.joinGroup()}>
          Liity Ryhmään
        </Button>
        <Button mode="contained" style={StartScreenStyles.button} onPress={() => this.createGroup()}>
          Luo Ryhmä
        </Button>
      </View>
    );
  }
}