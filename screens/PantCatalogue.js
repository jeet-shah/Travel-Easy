import React from 'react';
import { Text, View,Image,TouchableOpacity,ScrollView,Dimensions,Modal, TouchableHighlight, Alert } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import MyHeader from '../component/MyHeader';
import {styles} from '../component/Styles';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from 'firebase';
import db from '../config';

export default class PantCatalgue extends React.Component{

    constructor(props){
        super(props)
        this.state={
            name:this.props.navigation.getParam('details')['name'],
            image:this.props.navigation.getParam('details')['avatar_url'],
            image4:this.props.navigation.getParam("details")['avatar_url1'],
            image5:this.props.navigation.getParam("details")['avatar_url2'],
            subtitle:this.props.navigation.getParam('details')['subtitle'],
            count:0,
            size:'42',
            userID:firebase.auth().currentUser.email,
            isModal1Visible:'false',
            isModal2Visible:'false',
            isModal3Visible:'false',
            image1:[
                {url:this.props.navigation.getParam("details")['avatar_url']}
            ],
            image2:[
                {url:this.props.navigation.getParam("details")['avatar_url1']}
            ],
            image3:[
                {url:this.props.navigation.getParam("details")['avatar_url2']}
            ],
            rate:0,
            price:0,
            docid:'',
            key:""
        }
    }

    rate = () => {
        if(this.state.subtitle === "Rent Rs: 50/day"){
            this.setState({
                rate:50,
        })
        }else{
            this.setState({
                rate:60,
            })
        }
    }

    componentDidMount(){
        this.rate()
    }

    deletedata = async() => {
        if(this.state.rate === 50 && this.state.size === "42"){
            this.setState({key:"1"})
        }else if (this.state.rate === 50 && this.state.size === "44"){
            this.setState({key:"2"})
        }else if (this.state.rate === 50 && this.state.size === "46"){
            this.setState({key:"3"})
        }else if (this.state.rate === 60 && this.state.size === "42"){
            this.setState({key:"4"})
        }else if(this.state.rate === 60 && this.state.size === "44"){
            this.setState({key:"5"})
        }else if (this.state.rate === 60 && this.state.size === "46"){
            this.setState({key:"6"})
        }
        const citiesRef = db.collection('Cart').doc(this.state.userID).collection('Pant').where("userID","==",this.state.userID);
        const snapshot = await citiesRef.get();
        var PantInfo = []
        snapshot.docs.map(doc => {
            var PantInfos = doc.data()
            PantInfo.push(PantInfos)
        })
        if(PantInfo.filter(item => item.PantName === this.state.name && item.PantSize === this.state.size).length === 0){
            db.collection('Cart').doc(this.state.userID).collection('Pant').add({
                "PantName":this.state.name,
                "PantQuantity":this.state.count,
                "PantSize":this.state.size,
                "Rate":this.state.rate,
                "userID":this.state.userID,
                "Price":this.state.rate * this.state.count,
                "Key":this.state.key
            })
        }else{
            db.collection('Cart').doc(this.state.userID).collection('Pant').where("PantName","==",this.state.name).get()
            .then(snapshots => {
                snapshots.docs.forEach(doc => {
                    let docid = doc.id
                    this.setState({
                        docid:docid
                    })
                })
                db.collection('Cart').doc(this.state.userID).collection('Pant').doc(this.state.docid).delete()
                .then(()=>{
                    db.collection('Cart').doc(this.state.userID).collection('Pant').add({
                        "PantName":this.state.name,
                        "PantQuantity":this.state.count,
                        "PantSize":this.state.size,
                        "Rate":this.state.rate,
                        "userID":this.state.userID,
                        "Price":this.state.rate * this.state.count,
                        "Key":this.state.key
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
                <Text style={{marginTop:20,fontWeight:'bold'}}> {this.state.subtitle} </Text>
                <View style={{flexDirection:'row',marginTop:20,marginBottom:405}}>
                    <DropDownPicker
                        items={[
                            {label: '32', value: '32',selected:true},
                            {label: '34', value: '34'},
                            {label: '36', value: '36'}
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
                    <TouchableOpacity style={[styles.smallbutton,{marginLeft:10}]} onPress={() => {
                        this.deletedata();
                    }}>
                    <Text style={[styles.buttonText,{fontSize:13,fontWeight:'bold'}]}> Add To Cart </Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}