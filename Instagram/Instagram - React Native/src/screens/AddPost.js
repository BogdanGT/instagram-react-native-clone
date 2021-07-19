import React,{useState,useEffect,useContext} from 'react'
import {View,Text, Button, Image, TextInput} from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import {Context} from '../context/createDataContext'
import {getToken} from '../context/helperFunctions'

const AddPost = (props) => {
    const [res,setRes] = useState("")
    const [description,setDescription] = useState("")
    const [token,setToken] = useState("")
    const {addPost} = useContext(Context)

    const uploadPhoto = async () => {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.images],
        });
        setRes(res)
    }

    const data = new FormData()
    data.append("file",res)
    data.append("description" , description)



    
    useEffect(async () => {
        setToken(await getToken())
    },[])
    
    
    return <View style={{flex:1,backgroundColor:"white"}}>
        <Text style={{fontFamily:"Roboto-Bold",fontSize:20,textAlign:"center"}}>Create a post</Text>
        <View style={{justifyContent:"center",flex:1}}>
            {res.uri && <Image source={{uri:res.uri}} style={{width:null,height:300}} />}
            <Button onPress={() => uploadPhoto()} title="Upload photo" />
            <TextInput placeholder="Description..." style={{borderWidth:1}} onChangeText={setDescription} />
            <Button title="Add post" onPress={() => addPost(data,token , () => props.navigation.navigate("Home"))} />
        </View>
    </View>
}

export default AddPost