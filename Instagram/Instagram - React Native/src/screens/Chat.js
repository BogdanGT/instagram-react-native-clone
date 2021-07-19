import React, { useEffect, useState } from 'react'
import { View,Text, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native'
import {apiLink, getUser} from '../context/helperFunctions'

const Chat = (props) => {
    const [user,setUser] = useState([])

    
    useEffect(async () => {
        setUser(await getUser())
    },[])


    
    return <View style={{backgroundColor:"white",flex:1}}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Text style={{fontFamily:"Roboto-Bold",fontSize:20,textAlign:"center"}}>Conversations</Text>
        <FlatList 
            data={user.messages}
            keyExtractor={(el) => el.username}
            renderItem={({item,index}) => {
                return <View>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Conversation" , {username:item.username , myPhoto:user.profilePhoto,userPhoto:item.photo , messages:item.chat,meId:user._id, userId:item.id , convIndex:index})}>
                        <View style={{flexDirection:"row",alignItems:"center",padding:10}}>
                            <Image source={{uri:`${apiLink}/images/${item.photo}`}} style={{width:50,height:50,borderRadius:50}} />
                            <Text style={{marginLeft:10,fontWeight:"bold"}}>{item.username}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }}
        />
    </View>
}

export default Chat