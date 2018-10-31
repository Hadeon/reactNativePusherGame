import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';

import Pusher from 'pusher-js/react-native';
import shortid from 'shortid';
import Spinner from 'react-native-spinkit';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      piece: '',
      rival_username: '',
      is_playing: false,
      show_prompt: false,
      is_waiting: false,
      is_room_creator: false
    }

    this.game_channel = null;
    this.is_channel_binded = null;

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onPressCreateRoom = this.onPressCreateRoom.bind(this);
    this.onPressJoinRoom = this.onPressJoinRoom.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.onCancelJoinRoom = this.onCancelJoinRoom.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  componentWillMount() {
    this.puser = new Pusher('API KEY', {
      authEndpoint: 'AUTH ENDPOINT',
      cluster: 'APP CLUSTER',
      encrypted: true
    });
  }

   componentDidUpdate() {
     if(this.state.is_waiting && !this.is_channel_binded){
       this.game_channel.bind('client-joined', (data) => {
         this.setState({
           is_waiting: false,
           is_playing: true,
           rival_username: data.username
         });

         if(this.state.is_room_creator){
           this.game_channel.trigger('client-joined', {
             username: this.state.username
           });
         }
       });

       this.is_channel_binded = true;
     }
   }
}