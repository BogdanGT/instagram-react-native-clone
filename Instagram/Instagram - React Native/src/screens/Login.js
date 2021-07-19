import React,{useEffect,useContext,useState} from 'react'
import {View,Text, TextInput, Button, TouchableOpacity} from 'react-native'
import KeyChain from 'react-native-keychain'
import { Context } from '../context/createDataContext'


const Login = (props) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {login} = useContext(Context)

    useEffect(async () => {
        const token = await KeyChain.getGenericPassword()

        if(token){
            props.navigation.navigate("Home")
        }
        // await KeyChain.resetGenericPassword()
    },[])
    return <View style={{flex:1,justifyContent:"center",marginBottom:200}}>
        <Text style={{textAlign:"center",fontSize:25,marginBottom:20}}>Login</Text>
        <TextInput onChangeText={setEmail} style={{width:null,height:40,borderWidth:1}} placeholder="Email" />
        <TextInput secureTextEntry onChangeText={setPassword} style={{width:null,height:40,borderWidth:1,marginVertical:20}} placeholder="Password" />
        <Button title="Login" onPress={() => login({email,password} , () => props.navigation.navigate("Home"))} />
        <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
            <Text>Create an account</Text>
        </TouchableOpacity>
    </View>
}

export default Login