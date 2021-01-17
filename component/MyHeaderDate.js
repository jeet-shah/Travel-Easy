import React, { Component } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { Icon } from 'react-native-elements';

export default class MyHeaderDate extends Component{

    render(){
        return(
            <View style={styles.header}>
                <View style={{width:"80%",paddingLeft:80}}>
                    <Text style={styles.headertext}> {this.props.title} </Text>
                </View>
                <Icon style={{marginRight:13}} size={30} color="#696969" name="user-circle" type="font-awesome-5" onPress={()=>{this.props.navigation.navigate('Profile')}} />
                <Icon style={{marginTop:1}} size={30} color='#696969' name='briefcase' type='font-awesome' onPress={()=>{this.props.navigation.navigate('Cart')}} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        width:375,
        height:80,
        flexDirection:"row",
        backgroundColor:"#eaf8fe",
        paddingTop:45,
        alignItems:"center",
        alignSelf:"center"
    },
    headertext:{
        fontWeight:'bold',
        fontSize:20,
        letterSpacing:1,
        color:"black",
        alignSelf:"center"
    },
})