import React,{useContext, useEffect,useState} from 'react'
import {View,Text, TextInput,Button, Image} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Context } from '../context/createDataContext'
import { apiLink, getToken, getUser ,getUserProfile} from '../context/helperFunctions'

const AddComment = (props) => {
    const {postId,comments,userId} = props.route.params
    const {addComment,deleteComment} = useContext(Context)
    const [comment,setComment] = useState("")
    const [token,setToken] = useState("")
    const [user,setUser] = useState([])

    console.log(comments)

    useEffect(async () => {
        setToken(await getToken())
        setUser(await getUser())
    },[])

    const checkUser = () => {
        if(user._id != userId){
            props.navigation.navigate("UserProfile" , {userId})
        }else{
            props.navigation.navigate("Profile" , {userId})
        }
    }


    return <View style={{flex:1}}>
        <FlatList 
            data={comments}
            keyExtractor={el => el._id}
            renderItem={({item}) => {
                return <View style={{justifyContent:"space-between",flexDirection:"row",alignItems:"center"}}>
                    <View style={{flexDirection:"row",alignItems:"center",marginHorizontal:10,marginVertical:5}}>
                        <Image source={{uri:`${apiLink}/images/${item.photo}`}} style={{width:40,height:40,borderRadius:25}} />
                        <TouchableOpacity onPress={() => checkUser()}>
                            <Text style={{marginLeft:10,fontWeight:"bold"}}>{item.username}</Text>
                        </TouchableOpacity>
                        <Text style={{marginLeft:5}}>{item.comment}</Text>
                    </View>
                    {item.userId == user._id && <TouchableOpacity onPress={() => deleteComment({postId , commentId:item._id} , token)}>
                        <Text style={{marginRight:10,backgroundColor:"red",borderRadius:5,padding:5,color:"white",fontWeight:"bold"}}>
                            DELETE
                        </Text>
                    </TouchableOpacity>
                    }
                </View>
            }}
        />
        <View style={{position:"absolute",bottom:0,left:0,right:0}}>
            <TextInput style={{borderWidth:1}} onChangeText={setComment} />
            <Button title="Add comment" onPress={() => addComment({postId , comment} , token)} />
        </View>
    </View>
}

export default AddComment