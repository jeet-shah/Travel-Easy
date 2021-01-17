import React from 'react';
import { FlatList, ScrollView, Image, View} from 'react-native';
import {ListItem,Avatar} from 'react-native-elements';
import MyHeaderCatalogue from '../component/MyHeaderCatalogue';
import {styles} from '../component/Styles';
import db from '../config';
import firebase from 'firebase';

const shirtlist = [
    {
        name:"Blue Shirt",
        subtitle:"Rent Rs: 30/day",
        avatar_url:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/6581655/2018/6/13/2357211f-072e-47be-95d3-8cef183eb3411528868860724-DENNISON-Men-Blue-Premium-Regular-Fit-Solid-Formal-Shirt-3501528868859747-3.jpg",
        avatar_url1:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/6581655/2018/6/13/6074a4e2-f8e0-4a01-b32a-53318cace5bb1528868860743-DENNISON-Men-Blue-Premium-Regular-Fit-Solid-Formal-Shirt-3501528868859747-2.jpg",
        avatar_url2:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/6581655/2018/6/13/0fef6f00-7ce6-4a51-befc-c98c99494c461528868860704-DENNISON-Men-Blue-Premium-Regular-Fit-Solid-Formal-Shirt-3501528868859747-4.jpg"
    },
    {
        name:"Black Shirt",
        subtitle:"Rent Rs: 40/day",
        avatar_url:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11766500/2021/1/13/efae7f72-29bf-4572-ae03-26f66666fbd41610531382661-INVICTUS-Men-Black-Slim-Fit-Solid-Cotton-Linen-Formal-Shirt--2.jpg",
        avatar_url1:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11766500/2021/1/13/43b3d2e0-1ae1-46a5-8b23-669c501509801610531380499-INVICTUS-Men-Black-Slim-Fit-Solid-Cotton-Linen-Formal-Shirt--6.jpg",
        avatar_url2:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11766500/2021/1/13/c6070a49-b5e3-4770-9e6f-99f6934d76361610531383150-INVICTUS-Men-Black-Slim-Fit-Solid-Cotton-Linen-Formal-Shirt--1.jpg"
    }
]

const pantlist = [
    {
        name:"Blue Pant",
        subtitle:"Rent Rs: 50/day",
        avatar_url:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2173625/2017/11/21/11511243828617-INVICTUS-Men-Blue--Black-Slim-Fit-Checked-Formal-Trousers-4051511243828448-1.jpg",
        avatar_url1:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2173625/2017/11/21/11511243828584-INVICTUS-Men-Blue--Black-Slim-Fit-Checked-Formal-Trousers-4051511243828448-3.jpg",
        avatar_url2:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2173625/2017/11/21/11511243828603-INVICTUS-Men-Blue--Black-Slim-Fit-Checked-Formal-Trousers-4051511243828448-2.jpg"
    },
    {
        name:"Cream Pants",
        subtitle:"Rent Rs: 60/day",
        avatar_url:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/3/21/8d768496-f5c8-4b38-819e-09d1bb53eca91584740894202-4.jpg",
        avatar_url1:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/3/21/66b1ec30-99f0-445c-899a-cfbdfa0dea511584740894250-5.jpg",
        avatar_url2:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/productimage/2020/3/21/5492c5d7-7b0c-4479-a699-0f011b31fff01584740894105-2.jpg"
    }
]

const watchlist = [
    {
        name:"Smart Watch",
        subtitle:"Rent Rs: 30/Day",
        avatar_url:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2019/2/23/dc05b5e5-aa82-493e-bf0b-0c309baf21021550920383101-1.jpg",
        avatar_url1:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2019/2/23/2261262d-8f2f-4451-9584-9d0cb90e48cf1550920383155-3.jpg",
        avatar_url2:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/productimage/2019/2/23/779240b6-f86a-4d91-aa5c-c42fac11d7fc1550920383211-5.jpg"
    },
    {
        name:"Formal Watch",
        subtitle:"Rent Rs: 25/Day",
        avatar_url:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/productimage/2020/12/28/37d60da3-74d5-435e-b183-3e76ddc618711609154153400-1.jpg",
        avatar_url1:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/productimage/2020/12/28/343f0db7-73ee-4c54-88ba-bc45200240c31609154153507-3.jpg",
        avatar_url2:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/productimage/2020/12/28/ff7b8131-4e6e-47af-a75a-e7cde25f89eb1609154153466-2.jpg"
    }
]

const tielist = [
    {
        name:"Blue Tie",
        subtitle:"Rent Rs: 20/Day",
        avatar_url:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/10/3/d7e451a7-d999-463b-a9fc-c7a76a7d5c081601675356056-2.jpg",
        avatar_url1:"https://assets.myntassets.com/h_68,q_90,w_52/v1/assets/images/productimage/2020/10/3/3b48a79b-56e8-4782-82ac-935a2e95f0b71601675356002-1.jpg",
        avatar_url2:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/10/3/eaafd439-05cf-4447-852b-13c1759693551601675356120-3.jpg"
    },
    {
        name:"Red Tie",
        subtitle: "RentRs: 20/Day",
        avatar_url:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2019/11/5/12f9b710-6049-4eb5-b5bb-948619ecd8951572951600886-3.jpg",
        avatar_url1:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2019/11/5/90ffa3b8-69d7-4a4e-b7e9-4c0e4aa86f8f1572951600960-4.jpg",
        avatar_url2:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/productimage/2019/11/5/377acde6-7385-48b6-8334-b4e4cba9e6561572951600826-2.jpg"
    }
]

const sshoelist = [
    {
        name:"Blue Shoe",
        subtitle:"Rent Rs: 30/Day",
        avatar_url:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12494346/2020/12/4/9591e4a8-1245-4983-b978-fb006b2c2ed41607078808083-HRX-by-Hrithik-Roshan-Men-Navy-Blue-Woven-Design-Front-Runne-4.jpg",
        avatar_url1:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12494346/2020/12/4/1f421762-3820-4ed3-95ff-04d86dcbae741607078808210-HRX-by-Hrithik-Roshan-Men-Navy-Blue-Woven-Design-Front-Runne-1.jpg",
        avatar_url2:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12494346/2020/12/4/cf3dff27-7223-4c9c-b0b5-fe0df17168081607078808165-HRX-by-Hrithik-Roshan-Men-Navy-Blue-Woven-Design-Front-Runne-2.jpg"
    },
    {
        name:"Black Shoe",
        subtitle:"Rent Rs: 25/Day",
        avatar_url:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/9/25/96470f2a-afe8-4c85-8646-d4eec3455ea21600990596759-4.jpg",
        avatar_url1:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/productimage/2020/9/25/7ef3586a-d426-4b37-ae2d-5e65291a79a41600990596804-5.jpg",
        avatar_url2:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/productimage/2020/9/25/0e79bb35-8bf9-4267-b70e-ac6a1c57b0581600990596677-2.jpg"
    }
]

const fshoelist = [
    {
        name:"Black Shoe",
        subtitle:"Rent Rs: 35/Day",
        avatar_url:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/productimage/2020/3/5/898ae521-9f56-4de5-9c0e-d5ee765cb33d1583362853588-4.jpg",
        avatar_url1:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/productimage/2020/3/5/0ebfcb4c-e4c7-4bc4-a3e8-9850c260fa721583362853528-3.jpg",
        avatar_url2:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/productimage/2020/3/5/3872bb0f-edf9-425b-847d-fc6287fa78281583362853472-2.jpg"
    },
    {
        name:"Grey Shoe",
        subtitle:"Rent Rs 30/Day",
        avatar_url:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12120208/2020/8/26/d7aa6d03-e1f1-4a4f-935e-947249d3d0b51598431993215-INVICTUS-Men-Formal-Shoes-6521598431992633-1.jpg",
        avatar_url1:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12120208/2020/8/26/1102c58b-739f-427d-9436-222388a59d001598431992875-INVICTUS-Men-Formal-Shoes-6521598431992633-7.jpg",
        avatar_url2:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/12120208/2020/8/26/e24c583e-d004-484f-b598-c8fbf44761c61598431993167-INVICTUS-Men-Formal-Shoes-6521598431992633-2.jpg"
    }
] 

export default class ShirtCatalogue extends React.Component{

    constructor(props){
        super(props)
        this.state={
            name:this.props.navigation.getParam('details')['name'],
            subtitle:this.props.navigation.getParam('details')['subtitle'],
            titleShirt:"Shirt",
            titlepant:"Pant",
            tittlewatch:"Watch",
            titletie:"Tie",
            titlesshoe:"Sports Shoe",
            titlefshoe:"Formal Shoe",
            userID:firebase.auth().currentUser.email
        }
    }

    keyExtractor = (item, index) => index.toString()
    renderItem = ({ item }) => {
        return(
          <ListItem style={{height:231,width:350}} bottomDivider
            onPress={()=>{
                this.props.navigation.navigate('ShirtCatalogue',{"detail":item})
            }}
          >
          <Avatar source={{uri: item.avatar_url}} containerStyle={{width:150,height:200}} />
          <ListItem.Content>
          <ListItem.Title style={{fontWeight:'bold',fontSize:18,color:'black'}}>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={{fontSize:16,color:'black'}}>{item.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
          </ListItem>
    )}
    keyExtractor1 = (item, index) => index.toString()
    renderItem1 = ({ item }) => {
        return(
          <ListItem style={{height:231,width:350}} bottomDivider 
          onPress={()=>{
            this.props.navigation.navigate('PantCatalogue',{"details":item})
        }}
          >
          <Avatar source={{uri: item.avatar_url}} containerStyle={{width:150,height:200}} />
          <ListItem.Content>
          <ListItem.Title style={{fontWeight:'bold',fontSize:18,color:'black'}}>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={{fontSize:16,color:'black'}}>{item.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
          </ListItem>
    )}
    keyExtractor2 = (item, index) => index.toString()
    renderItem2 = ({ item }) => {
        return(
          <ListItem style={{height:231,width:350}} bottomDivider 
          onPress={()=>{
            this.props.navigation.navigate('WatchCatalogue',{"details1":item})
        }}
          >
          <Avatar source={{uri: item.avatar_url}} containerStyle={{width:150,height:200}} />
          <ListItem.Content>
          <ListItem.Title style={{fontWeight:'bold',fontSize:18,color:'black'}}>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={{fontSize:16,color:'black'}}>{item.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
          </ListItem>
    )}
    keyExtractor3 = (item, index) => index.toString()
    renderItem3 = ({ item }) => {
        return(
          <ListItem style={{height:231,width:350}} bottomDivider 
          onPress={()=>{
            this.props.navigation.navigate('TieCatalogue',{"details2":item})
        }}
          >
          <Avatar source={{uri: item.avatar_url}} containerStyle={{width:150,height:200}} />
          <ListItem.Content>
          <ListItem.Title style={{fontWeight:'bold',fontSize:18,color:'black'}}>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={{fontSize:16,color:'black'}}>{item.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
          </ListItem>
    )}
    keyExtractor4 = (item, index) => index.toString()
    renderItem4 = ({ item }) => {
        return(
          <ListItem style={{height:231,width:350}} bottomDivider 
          onPress={()=>{
            this.props.navigation.navigate('SportCatalogue',{"details3":item})
        }}
          >
          <Avatar source={{uri:item.avatar_url}} containerStyle={{width:150,height:200}} />
          <ListItem.Content>
          <ListItem.Title style={{fontWeight:'bold',fontSize:18,color:'black'}}>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={{fontSize:16,color:'black'}}>{item.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
          </ListItem>
    )}
    keyExtractor5 = (item, index) => index.toString()
    renderItem5 = ({ item }) => {
        return(
          <ListItem style={{height:231,width:350}} bottomDivider 
          onPress={()=>{
            this.props.navigation.navigate('FormalCatalogue',{"details4":item})
        }}
          >
          <Avatar source={{uri: item.avatar_url}} containerStyle={{width:150,height:200}} />
          <ListItem.Content>
          <ListItem.Title style={{fontWeight:'bold',fontSize:18,color:'black'}}>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={{fontSize:16,color:'black'}}>{item.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
          </ListItem>
    )}

    getscreen = () => {
        if(this.state.name === this.state.titlepant){
            return(
                <View>
                     <FlatList 
                       keyExtractor={this.keyExtractor1}
                       renderItem={this.renderItem1}
                       data={pantlist}
                       style={{width:350,marginTop:100,height:500}}
                       scrollEnabled={false}
                      />
                </View>
            )
        }else if(this.state.name === this.state.titleShirt){
            return(
                <View>
                     <FlatList 
                       keyExtractor={this.keyExtractor}
                       renderItem={this.renderItem}
                       data={shirtlist}
                       style={{width:350,marginTop:100}}
                       scrollEnabled={false}
                     />
                </View>
            )
        }else if(this.state.name === this.state.tittlewatch){
            return(
                <View>
                    <FlatList
                      keyExtractor={this.keyExtractor2}
                      renderItem={this.renderItem2}
                      data={watchlist}
                      style={{width:350,marginTop:100}}
                      scrollEnabled={false}
                    />
                </View>
            )
        }else if(this.state.name === this.state.titletie){
            return(
                <View>
                    <FlatList
                      keyExtractor={this.keyExtractor3}
                      renderItem={this.renderItem3}
                      data={tielist}
                      style={{width:350,marginTop:100}}
                      scrollEnabled={false}
                    />
                </View>
            )
        }else if(this.state.name === this.state.titlesshoe){
            return(
                <View>
                    <FlatList
                      keyExtractor={this.keyExtractor4}
                      renderItem={this.renderItem4}
                      data={sshoelist}
                      style={{width:350,marginTop:100}}
                      scrollEnabled={false}
                    />
                </View>
            )
        }else if(this.state.name === this.state.titlefshoe){
            return(
                <View>
                    <FlatList
                      keyExtractor={this.keyExtractor5}
                      renderItem={this.renderItem5}
                      data={fshoelist}
                      style={{width:350,marginTop:100}}
                      scrollEnabled={false}
                    />
                </View>
            )
        }
    }


    render(){
        return(
            <View style={styles.container}>
              <View style={{marginTop:60,width:400}}>
                <MyHeaderCatalogue title={this.state.name} navigation={this.props.navigation} />
              </View>
                {this.getscreen()}
            </View>
        )
    }
}