import React, { useEffect,useState } from 'react'
import {View,Text, FlatList, Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {getFollowers,apiLink} from '../context/helperFunctions'


const YourFollowers = (props) => {
    const [user,setUser] = useState([])
    const {userId,meId} = props.route.params

    useEffect(async () => {
        setUser(await getFollowers(userId))
    },[])

    const checkUser = (itemId) => {
        console.log(userId , itemId)
        if(meId != itemId){
            props.navigation.navigate("UserProfile" , {userId:itemId})
            console.log("el")
        }else{
            props.navigation.navigate("Profile" , {userId})
            console.log("eu")
        }
    }

    return <View>
        <Text style={{textAlign:"center",fontSize:20,fontWeight:"bold"}}>Followers</Text>
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

export default YourFollowers