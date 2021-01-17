import MyHeader from '../component/MyHeader';
import {styles} from '../component/Styles';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from "firebase";
import db from "../config";
import React from 'react';
import { Text, View,Image,TouchableOpacity,ScrollView,Dimensions,Modal, TouchableHighlight } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';


export default class Catalogue2 extends React.Component{

    constructor(props){
        super(props);
        this.state={
            name:this.props.navigation.getParam("detail")['name'],
            image:this.props.navigation.getParam("detail")['avatar_url'],
            image4:this.props.navigation.getParam("detail")['avatar_url1'],
            image5:this.props.navigation.getParam("detail")['avatar_url2'],
            subtitle:this.props.navigation.getParam('detail')['subtitle'],
            rate:0,
            count:0,
            size:'42',
            userID:firebase.auth().currentUser.email,
            isModal1Visible:'false',
            isModal2Visible:'false',
            isModal3Visible:'false',
            image1:[
                {url:this.props.navigation.getParam("detail")['avatar_url']}
            ],
            image2:[
                {url:this.props.navigation.getParam("detail")['avatar_url1']}
            ],
            image3:[
                {url:this.props.navigation.getParam("detail")['avatar_url2']}
            ],
            price:0,
            docid:''
        }
    }

    rate = () => {
        if(this.state.subtitle === "Rent Rs: 30/day"){
            this.setState({
                rate:30
            })
        }else{
            this.setState({
                rate:40
            })
        }
    }

    componentDidMount(){
        this.rate()
    }

    deletedata = async() => {
        const citiesRef = db.collection('Cart').doc(this.state.userID).collection('Shirt').where("userID","==",this.state.userID);
        const snapshot = await citiesRef.get();
        var PantInfo = []
        snapshot.docs.map(doc => {
            var PantInfos = doc.data()
            PantInfo.push(PantInfos)
        })
        if(PantInfo.filter(item => item.ShirtName === this.state.name && item.ShirtSize === this.state.size).length === 0){
            db.collection('Cart').doc(this.state.userID).collection('Shirt').add({
                "ShirtName":this.state.name,
                "ShirtQuantity":this.state.count,
                "ShirtSize":this.state.size,
                "Rate":this.state.rate,
                "userID":this.state.userID,
                "Price":this.state.rate * this.state.count
            })
        }else{
            db.collection('Cart').doc(this.state.userID).collection('Shirt').where("ShirtName","==",this.state.name).get()
            .then(snapshots => {
                snapshots.docs.forEach(doc => {
                    let docid = doc.id
                    this.setState({
                        docid:docid
                    })
                })
                db.collection('Cart').doc(this.state.userID).collection('Shirt').doc(this.state.docid).delete()
                .then(()=>{
                    db.collection('Cart').doc(this.state.userID).collection('Shirt').add({
                        "ShirtName":this.state.name,
                        "ShirtQuantity":this.state.count,
                        "ShirtSize":this.state.size,
                        "Rate":this.state.rate,
                        "userID":this.state.userID,
                        "Price":this.state.rate * this.state.count
                    })
                })
            })
        }
    }

    magnify1 = () => {
        return(
            <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isModal1Visible}
            style={{width:'100%'}}
            >
                <View style={[styles.container,]}>
                    <View style={{width:370,height:'25%'}}>
                        <TouchableHighlight onPress={()=>{this.setState({isModal1Visible:false})}}>
                            <View style={{width:'100%',height:'100%'}}></View>
                        </TouchableHighlight>
                    </View>
                    <View style={{width:370,height:'50%'}}>
                        <ImageViewer imageUrls={this.state.image1}/>
                    </View>
                    <View style={{width:370,height:'25%'}}>
                        <TouchableHighlight onPress={()=>{this.setState({isModal1Visible:false})}}>
                            <View style={{width:'100%',height:'100%'}}></View>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        )
    }

    magnify2 = () => {
        return(
            <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isModal2Visible}
            style={{width:'100%'}}
            >
                <View style={styles.container}>
                    <View style={{width:370,height:'25%'}}>
                        <TouchableHighlight onPress={()=>{this.setState({isModal2Visible:false})}}>
                            <View style={{width:'100%',height:'100%'}}></View>
                        </TouchableHighlight>
                    </View>
                    <View style={{width:370,height:'50%'}}>
                        <ImageViewer imageUrls={this.state.image2}/>
                    </View>
                    <View style={{width:370,height:'25%'}}>
                        <TouchableHighlight onPress={()=>{this.setState({isModal2Visible:false})}}>
                            <View style={{width:'100%',height:'100%'}}></View>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        )
    }

    magnify3 = () => {
        return(
            <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isModal3Visible}
            style={{width:'100%'}}
            >
                <View style={styles.container}>
                    <View style={{width:370,height:'25%'}}>
                        <TouchableHighlight onPress={()=>{this.setState({isModal3Visible:false})}}>
                            <View style={{width:'100%',height:'100%'}}></View>
                        </TouchableHighlight>
                    </View>
                    <View style={{width:370,height:'50%'}}>
                        <ImageViewer imageUrls={this.state.image3}/>
                    </View>
                    <View style={{width:370,height:'25%'}}>
                        <TouchableHighlight onPress={()=>{this.setState({isModal3Visible:false})}}>
                            <View style={{width:'100%',height:'100%'}}></View>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        )
    }

    render(){
        let dimensions = Dimensions.get("window");
        let imageHeight = Math.round((dimensions.width * 9) / 16);
        let imageWidth = dimensions.width;
        return(
            <View style={styles.container}>
                {this.magnify1()}
                {this.magnify2()}
                {this.magnify3()}
                <View style={{marginTop:60,width:370}}>
                <MyHeader title={this.state.name} navigation={this.props.navigation} />
                </View>
                <View style={{height:300}}>
                <ScrollView
                horizontal={true}
              >
                  <TouchableOpacity onPress={()=>{this.setState({isModal1Visible:true})}}>
                  <Image 
                    source={{uri:this.state.image}}
                    style={{height: imageHeight, width: imageWidth}}
                   />
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>{this.setState({isModal2Visible:true})}}>
                   <Image 
                    source={{uri:this.state.image4}}
                    style={{height: imageHeight, width: imageWidth}}
                   />
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>{this.setState({isModal3Visible:true})}}>
                   <Image 
                    source={{uri:this.state.image5}}
                    style={{height: imageHeight, width: imageWidth}}
                   />
                   </TouchableOpacity>
              </ScrollView>
              </View>
              <Text style={{fontWeight:'bold',marginTop:20}}> {this.state.subtitle} </Text>
            <View style={{flexDirection:'row',marginTop:20,marginBottom:405}}>
                <DropDownPicker
                    items={[
                        {label: '42', value: '42',selected:true},
                        {label: '44', value: '44'},
                        {label: '46', value: '46'}
                    ]}
                    containerStyle={{height: 40}}
                    onChangeItem={item => this.setState({size:item.label})}
                    placeholder="Size"
                    style={{width:80}}
                    dropDownStyle={{width:100}}
                />
                <TouchableOpacity onPress={()=>{
                    if(this.state.count === 0){
                        this.setState({count:0})
                    }else{
                        this.setState({count:this.state.count-1})
                    }
                }} style={[styles.squarebutton,{marginLeft:15}]}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={[styles.shirttext,{fontSize:20,backgroundColor:'white',textAlignVertical:'center',paddingTop:8,marginLeft:5,marginRight:5,height:40}]}> {this.state.count} </Text>
                <TouchableOpacity onPress={()=>{this.setState({count:this.state.count+1})}} style={styles.squarebutton}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.smallbutton,{marginLeft:10}]} onPress={()=>{this.deletedata()}}>
                <Text style={[styles.buttonText,{fontSize:13,fontWeight:'bold'}]}> Add To Cart </Text>
            </TouchableOpacity>
            </View>
            </View>
        )
    }
}