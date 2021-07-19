import React, {useState, useContext} from 'react'
import {View,Text, TextInput, Button,Image} from 'react-native'
import {Context} from '../context/createDataContext'
import DocumentPicker from 'react-native-document-picker'

const Register = (props) => {
    const {state,register} = useContext(Context)
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [file,setFile] = useState("")

    const data = new FormData()
    data.append("file",file)
    data.append("email",email)
    data.append("username",username)
    data.append("password",password)
    data.append("confirmPassword",confirmPassword)

    const uploadPhoto = async () => {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.images],
        });
        setFile(res)
    }



    return <View style={{flex:1,justifyContent:"center",marginBottom:200}}>
    <Text style={{textAlign:"center",fontSize:25,marginBottom:20}}>Register</Text>
    <TextInput 
        style={{width:null,height:40,borderWidth:1,marginBottom:20}} 
        placeholder="Email" 
        onChangeText={setEmail}
    />
    <TextInput 
        style={{width:null,height:40,borderWidth:1,marginBottom:20}} 
        placeholder="Username"
        onChangeText={setUsername}
    />
    <TextInput 
        style={{width:null,height:40,borderWidth:1,marginBottom:20}} 
        placeholder="Password" 
        onChangeText={setPassword}
        secureTextEntry
    />
    <TextInput 
        style={{width:null,height:40,borderWidth:1,marginBottom:20}} 
        placeholder="Confirm Password"
        onChangeText={setConfirmPassword}
        secureTextEntry
    />
    {file.uri && <Image source={{uri:file.uri}} style={{width:50,height:50}} />}
    <Button title="Pick a profile photo" onPress={() => uploadPhoto()} />
    <Button title="Register" onPress={() => register(data , () => props.navigation.navigate("Home"))} />


</View>
}

export default Register