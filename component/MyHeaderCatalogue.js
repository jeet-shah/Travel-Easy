import React, { Component } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';

export default class MyHeaderCatalogue extends Component{

    render(){
        return(
            <View style={styles.header}>
                <Icon style={{marginLeft:5}} size={40} color='#696969' name='angle-left' type='font-awesome' onPress={()=>{this.props.navigation.navigate('Catalogue')}} />
                <View style={{width:"70%",paddingLeft:70}}>
                    <Text style={styles.headertext}> {this.props.title} </Text>
                </View>
                <Icon style={{marginLeft:5,marginRight:15}} size={30} color="#696969" name="user-circle" type="font-awesome-5" onPress={()=>{this.props.navigation.navigate('Profile')}} />
                <Icon style={{marginTop:6}} size={30} color='#696969' name='briefcase' type='font-awesome' onPress={()=>{this.props.navigation.navigate('Cart')}} />
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
        alignSelf:'center'
    },
    headertext:{
        fontWeight:'bold',
        fontSize:20,
        letterSpacing:1,
        color:"black",
        alignSelf:"center"
    },
})