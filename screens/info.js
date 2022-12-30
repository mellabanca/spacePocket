import axios from "axios";
import React, {Component} from "react";
import {Alert, Text, View} from "react-native";

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
        axios.get("https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=ZddsIaHnPMJhDnfI6xfw7Nh5zGMP14x7oTwQFEjx")
             .then(response => {
                this.setState({
                    infoAPI: response.data.near_earth_objects
                })
             })
             .catch(error => {
                Alert.alert(error.message)
             })
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
                let danger = (media / close_approach_data[0].miss_distance.kilometers)
                             * 1000000000;
            })

            return(
                <View style = {{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text>Informações</Text>
                </View>
            )
    }
}
}