import axios from "axios";
import React, {Component} from "react";
import {Text, View, ImageBackground, SafeAreaView, StyleSheet,
        StatusBar, Alert, Image} from "react-native";
import MapView, {Marker} from "react-native-maps";


export default class ISSLocation extends Component{
    constructor(props){
        super(props);
        this.state = {
            infoAPI: {}
        }
    }

    componentDidMount(){
        this.getInfoAPI();
    }

    getInfoAPI = () => {
        axios.get("https://api.wheretheiss.at/v1/satellites/25544")
             .then(response=>{
                this.setState({
                    infoAPI: response.data
                })
             })
             .catch(error => {
                Alert.alert(error.message)
             })
    }

    render(){
        if(Object.keys(this.state.infoAPI).length === 0){
            return(
                <View style={styles.waitScreen}>
                    <Text>Loading...</Text>
                </View>
            )
        } else {
        return(
            <View style = {styles.container}>
                <SafeAreaView style={styles.emptyArea}/>
                <ImageBackground style={styles.topGround}
                                 source={require("../assets/iss_bg.jpg")}>
                    <View style={styles.titlePosition}>
                        <Text style={styles.title}>Station Location</Text>
                    </View>
                    <View style={styles.mapContainer}>
                        <MapView style={styles.map}
                                 region={{
                                    latitude: this.state.infoAPI.latitude,
                                    longitude: this.state.infoAPI.longitude,
                                    latitudeDelta: 100,
                                    longitudeDelta: 100
                                 }}>
                            <Marker coordinate={{
                                latitude: this.state.infoAPI.latitude,
                                longitude: this.state.infoAPI.longitude,
                            }}>
                                <Image style={styles.issIcon}
                                       source={require("../assets/iss_icon.png")}/>
                            </Marker>
                        </MapView>
                    </View>
                    <View style={styles.extraInfo}>
                        <Text style={styles.info}>Latitude: {this.state.infoAPI.latitude}</Text>
                        <Text style={styles.info}>Longitude: {this.state.infoAPI.longitude}</Text>
                        <Text style={styles.info}>Altitude (km): {this.state.infoAPI.altitude}</Text>
                        <Text style={styles.info}>Velocity (km/h): {this.state.infoAPI.velocity}</Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    emptyArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    topGround: {
        flex: 1,
        resizeMode: "cover"
    },
    titlePosition: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    mapContainer: {
        flex: 0.6
    },
    map: {
        width: "100%",
        height: "100%"
    },
    issIcon: {
        width: 50,
        height: 50
    },
    waitScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    extraInfo: {
        flex: 0.2,
        backgroundColor: "rgba(255,255,255,0.7)",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        padding: 30
    },
    info: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold"
    }
})