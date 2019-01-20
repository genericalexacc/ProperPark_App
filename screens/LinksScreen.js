import React from 'react';
import { Image, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import Colors from '../constants/Colors';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Help 🤔',
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image
          style={{width: 200, height: 200, borderRadius:100, alignSelf:'center', marginBottom:35, marginTop: 15}}
          source={{uri: 'https://i.imgflip.com/2rktvm.jpg'}}
        />
        <Text style={styles.text}>

          <Text style={{fontWeight: 'bold'}}>
            What is ParkIt:{"\n"}{"\n"}
          </Text>

          Parking signs are often convoluted and confusing for commuters.{"\n"}{"\n"}
          ParkIt uses machine learning to recognize the different parking signs and automatically determines if it's okay to park there.{"\n"}{"\n"}

          <Text style={{fontWeight: 'bold'}}>
            How to use ParkIt:{"\n"}{"\n"}
          </Text>

          Aim the camera towards a parking sign, and press the camera button to find out its availability.{"\n"}{"\n"}

          <Text style={{color: Colors.tabIconSelected}}
            onPress={() => Linking.openURL('http://3.89.45.182/index.html')}>
            Our Website
          </Text>
        </Text>
      </ScrollView>
    )
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