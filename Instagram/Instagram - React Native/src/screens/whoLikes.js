import React from 'react'
import {View,Text,FlatList,Image, TouchableOpacity} from 'react-native'
import { apiLink } from '../context/helperFunctions'

const WhoLikes = (props) => {
    const {whoLikes,userId} = props.route.params
    console.log(whoLikes)
    return <View>
        <FlatList 
            data={whoLikes}
            keyExtractor={el => el.userId}
            renderItem={({item}) => {
                return <View style={{flexDirection:"row",alignItems:"center",marginVertical:5,marginHorizontal:10}}>
                    <Image source={{uri:`${apiLink}/images/${item.photo}`}} style={{width:50,height:50,borderRadius:25}} />
                    <TouchableOpacity onPress={() => props.navigation.navigate("UserProfile" , {userId:item.userId})}>
                            <Text style={{marginLeft:10,fontWeight:"bold"}}>{item.username}</Text>
                        </TouchableOpacity>
                </View>
            }}
        />
    </View>
}

export default WhoLikes