import React,{useEffect, useState} from 'react'
import {View,FlatList,Text,Image, TouchableOpacity} from 'react-native'
import {getFollowing,apiLink} from '../context/helperFunctions'

const YourFollowed = (props) => {
    const [user,setUser] = useState([])
    const {userId,meId} = props.route.params

    useEffect(async () => {
        setUser(await getFollowing(userId))
        console.log(user)
    },[])

    const checkUser = (itemId) => {
        if(meId){
            if(meId != itemId){
                props.navigation.navigate("UserProfile" , {userId:itemId})
                console.log("el")
            }else{
                props.navigation.navigate("Profile" , {userId:user._id})
                console.log("eu")
            }
        }else{
            if(userId != itemId){
                props.navigation.navigate("UserProfile" , {userId:itemId})
                console.log("el")
            }else{
                props.navigation.navigate("Profile" , {userId:user._id})
                console.log("eu")
            }
        }
    }

    console.log(user)
    return <View>
        <Text style={{textAlign:"center",fontSize:20,fontWeight:"bold"}}>Following</Text>
        <FlatList 
            data={user}
            keyExtractor={el => el._id}
            renderItem={({item}) => {
                return <View style={{flexDirection:"row" , alignItems:"center",marginVertical:5,marginHorizontal:10}}>
                    <Image source={{uri:`${apiLink}/images/${item.profilePhoto}`}} style={{width:50,height:50,borderRadius:25}} />
                    <TouchableOpacity onPress={() => checkUser(item._id)}>
                        <Text style={{marginLeft:10}}>{item.username}</Text>
                    </TouchableOpacity>
                </View>
            }}
        />
    </View>
}

export default YourFollowed