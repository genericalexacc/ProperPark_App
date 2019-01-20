import React from 'react';
import { Image, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import Colors from '../constants/Colors';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'About the team 😍',
  };

  render() {
    return(
    <ScrollView style={styles.container}>
          <Image
          style={{width: 200, height: 200, borderRadius:100, alignSelf:'center', marginBottom:35, marginTop: 15}}
          source={{uri: 'https://i.imgflip.com/2rlg08.jpg'}}
          />
        <Text style={styles.text}>
          <Text style={{fontWeight: 'bold'}}>
            Created by:{"\n"}{"\n"}
          </Text>
          <Text>LinkedIn: </Text>
          <Text style={{color: Colors.tabIconSelected}}
            onPress={() => Linking.openURL('https://www.linkedin.com/in/alex-shevchenko-69b56979/')}>
            Alexander Shevchenko
          </Text>{"\n"}{"\n"}
          <Text>LinkedIn: </Text>
          <Text style={{color: Colors.tabIconSelected}}
            onPress={() => Linking.openURL('https://www.linkedin.com/in/xin-rui-li-17b03b134/')}>
            Xin Rui Li
          </Text>{"\n"}{"\n"}
          <Text>LinkedIn: </Text>
          <Text style={{color: Colors.tabIconSelected}}
            onPress={() => Linking.openURL('https://www.linkedin.com/in/zhi-rui-guo-41a50a134/')}>
            Zhi Rui Guo
          </Text>{"\n"}{"\n"}
          <Text>LinkedIn: </Text>
          <Text style={{color: Colors.tabIconSelected}}
            onPress={() => Linking.openURL('https://www.linkedin.com/in/yun-kai-peng-52853a158/')}>
            Yun Kai Peng
          </Text>{"\n"}{"\n"}
        </Text>
      </ScrollView>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    padding: 20,
  },
  text:{
    fontSize: 20,
  }
});