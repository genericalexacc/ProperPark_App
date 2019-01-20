import React from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser, Camera, Permissions } from 'expo';
import { Icon } from 'expo';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';

export default class HomeScreen extends React.Component {
  
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  static navigationOptions = {
    header: null,
  }

  checkForTimeRules(array, callback) {
    let monthTerms = [];
    let filterTerms = [];
    let numbarr = []
    array.forEach((term) => {
      let firstIndex = term.indexOf("h");
      if(firstIndex != term.lastIndexOf("h") && firstIndex != -1){
        let numbarr = term.split("-")
        if(new Date().getHours() > numbarr[0].replace("h", "") && new Date().getHours() < numbarr[1].replace("h", "")){
          callback(false)
        }else{
          callback(true)
        }
      }
    })
    array.forEach((term) => {
      if(term.indexOf("h") !== -1){
        monthTerms.push(term)
      }
    })
    console.log("1)" + monthTerms)
    if(monthTerms.length == 0){
      console.log("no h")
      callback("none")
    }
    monthTerms.forEach((term) => {
      if(/\d/.test(term)){
        filterTerms.push(term)
      }
    })
    filterTerms.forEach((a)=>{
      var numb = a.match(/\d/g);
      numb = numb.join("");
      numbarr.push(numb)
    })
    for(i=0; i < Math.floor(numbarr.length / 2); i++){
      console.log(numbarr[i*2], numbarr[(i*2)+1])
      if(new Date().getHours() > numbarr[i*2] && new Date().getHours() < numbarr[(i*2)+1] ){
        callback(false)
      }else{
        callback(true)
      }
    }
  }

  // checkForMonthRules(array, callback){
  //   let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
  //   let monthTerms = [];
  //   let filterTerms = [];
  //   let numbarr = []

  //   array.forEach((term) => {
  //     let firstIndex = months.indexOf(term);
  //     if(firstIndex != months.lastIndexOf(term) && firstIndex != -1){
  //       let numbarr = term.split("au")
  //       if(new Date().getMonth() > numbarr[0] && new Date().getMonth() < numbarr[1]){
  //         callback(false)
  //       }else{
  //         callback(true)
  //       }
  //     }
  //   })
  //   array.forEach((term) => {
  //     if(months.indexOf(term) !== -1){
  //       monthTerms.push(term)
  //     }
  //   })
  //   if(monthTerms.length == 0){
  //     callback("none")
  //   }
  //   monthTerms.forEach((term) => {
  //     if(/\d/.test(term)){
  //       filterTerms.push(term)
  //     }
  //   })
  //   filterTerms.forEach((a)=>{
  //     var numb = a.match(/\d/g);
  //     numb = numb.join("");
  //     numbarr.push(numb)
  //   })
  //   let timeGood = true;
  //   for(i=0; i < Math.floor(numbarr.length / 2); i++){
  //     console.log(numbarr[i*2], numbarr[(i*2)+1])
  //     if(new Date().getHours() > numbarr[i*2] && new Date().getHours() < numbarr[(i*2)+1]){
  //       callback(false)
  //     }else{
  //       callback(true)
  //     }
  //   }
  // }

    // ["fl@cl",
    // "13h",
    // "-14h",
    // "vendredi",
    // "lorsque",
    // "stationnement",
    // "permis"]

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({quality: 0.05});
      let localUri = photo.uri;
      let filename = localUri.split('/').pop();
      let formData = new FormData();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      formData.append('sign', { uri: localUri, name: filename, type });
      fetch('http://3.89.45.182/api/upload_sign', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: formData
      }).then((data) => {
        console.log(data)
        let wordz = []
        let monthsFr = {'janvier': 'jan', 'fevrier': 'feb', 'mars':'mar', 'avril': 'apr', 'mai': 'may', 'juin': 'jun', 'juillet': 'jul', 'aout': 'aug', 'septembre': 'sep', 'octobre': 'oct', 'novembre': 'nov', 'decembre': 'dec'}
        JSON.parse(data._bodyText).regions.forEach((region)=>{
            region.lines.forEach((line)=>{
              line.words.forEach((word) => {
                a = word.text.toLowerCase().replace("é", "e").replace("è", "e").replace("ê", "e").replace("ë", "e").replace("à", "a").replace("á", "a").replace("â", "a").replace("ô", "o").replace('.', '')
                wordz.push(Object.keys(monthsFr).indexOf(a) === -1 ? a : monthsFr[a])
              })
            })
        })
        this.checkForTimeRules(wordz, (word) => {
          console.log(wordz, word)
          if(wordz.length == 0){
            // Alert.alert("Sign could not be read.", "")
            this.snap()
          }else if(word == "none"){
            this.snap()
            // Alert.alert("Sign could not be read.", "")
          }else if(word){
            Alert.alert("✅  You can park here", "")
          }else{
            Alert.alert("⚠️WARNING! YOU CAN'T PARK HERE!⚠️", "")
          }
        })
      })
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
    return (
      <View style={styles.container}>
      <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}  ref={ref => { this.camera = ref }}>
            <View 
              style={{
                flex: 1,
                alignSelf: 'center',
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'white', borderRadius:25, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, marginBottom: 25
                }}
                onPress={() => {
                  this.snap()
                }}>
              <Icon.Ionicons
                name={
                  Platform.OS === 'ios'
                    ? `ios-camera`
                    : 'md-camera'
                }
                size={45}
                color={Colors.tabIconSelected}
              />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      </View>
    );
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
