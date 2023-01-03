import axios from "axios";
import React, {Component} from "react";
import {Alert, Text, View, SafeAreaView, FlatList, StatusBar,
        Dimensions, Image, ImageBackground, StyleSheet, Platform} from "react-native";

export default class Info extends Component{
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
        axios
            .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=nAkq24DJ2dHxzqXyzfdreTvczCVOnwJuFLFq4bDZ")
            .then(response => {
                this.setState({ infoAPI: response.data.near_earth_objects })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({item}) => {
        let meteor = item;
        let bg, speed, size;
        if(meteor.dangerr <= 30){
            bg = require("../assets/meteor_bg1.png");
            speed = require("../assets/meteor_speed1.gif");
            size = 100;
        } else if(meteor.dangerr <= 75){
            bg = require("../assets/meteor_bg2.png");
            speed = require("../assets/meteor_speed2.gif");
            size = 150;
        } else {
            bg = require("../assets/meteor_bg3.png");
            speed = require("../assets/meteor_speed3.gif");
            size = 200;
        }
        return(
            <View>
                <ImageBackground source={bg} style={styles.topGround}>
                    <View style={styles.gifContainer}>
                        <Image source={speed} style={{width: size, height: size, alignSelf: "center"}}/>
                    </View>
                    <View>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={[styles.info, {marginTop: 20}]}>Closest to Earth - {item.close_approach_data[0].close_approach_date_full}</Text>
                        <Text style={[styles.info, {marginTop: 5}]}>Minimum Diameter (km) - {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
                        <Text style={[styles.info, {marginTop: 5}]}>Maximum Diameter (km) - {item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
                        <Text style = {[styles.info,{marginTop: 5}]}>Velocity (km/h) - {item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
                        <Text style = {[styles.info,{marginTop: 5}]}>Distance from Earth (km) - {item.close_approach_data[0].miss_distance.kilometers}</Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    render(){
        if(Object.keys(this.state.infoAPI).length === 0){
            return(
                <View style ={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text>Loading...</Text>
                </View>
            )
        } else {
            let infoList = Object.keys(this.state.infoAPI).map(data => {
                return this.state.infoAPI[data]
            })
            let meteors = [].concat.apply([],infoList)
            meteors.forEach(function(element){
                let media = (element.estimated_diameter.kilometers.estimated_diameter_min +
                             element.estimated_diameter.kilometers.estimated_diameter_max) / 2;
                let danger = (media / element.close_approach_data[0].miss_distance.kilometers)
                             * 1000000000;
                element.dangerr = danger;
            })
            meteors.sort(function(a,b){
                return b.dangerr - a.dangerr
            })
            meteors = meteors.slice(0,5);

            return(
                <View style = {styles.container}>
                    <SafeAreaView style={styles.emptyArea}/>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                        data={meteors}
                        horizontal={true}
                    />
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
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
   title: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        color: "white",
        marginLeft: 15
    },
    info: {
        color: "white",
        marginLeft: 15,
        marginBottom: 10,
    },
    gifContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
})