import React,{useEffect, useState} from 'react'
import {View,FlatList,Text,Image, TouchableOpacity} from 'react-native'
import {getFollowing,apiLink} from '../context/helperFunctions'

const YourFollowed = (props) => {
    const [user,setUser] = useState([])
    const {userId} = props.route.params

    useEffect(async () => {
        setUser(await getFollowing(userId))
        console.log(user)
    },[])

    const checkUser = (userId) => {
        if(user._id != userId){
            props.navigation.navigate("UserProfile" , {userId})
        }else{
            props.navigation.navigate("Profile" , {userId})
        }
    }
    return <View>
        <FlatList 
            data={user}
            keyExtractor={el => el.id}
            renderItem={({item}) => {
                return <View style={{flexDirection:"row" , alignItems:"center",marginVertical:5,marginHorizontal:10}}>
                    <Image source={{uri:`${apiLink}/images/${item.photo}`}} style={{width:50,height:50,borderRadius:25}} />
                    <TouchableOpacity onPress={() => checkUser(item.id)}>
                        <Text style={{marginLeft:10}}>{item.username}</Text>
                    </TouchableOpacity>
                </View>
            }}
        />
    </View>
}

export default YourFollowed