import React, { useContext, useEffect, useState,useRef } from 'react'
import {View,Text, Image, TextInput, TouchableOpacity, ScrollView,Animated,Dimensions} from 'react-native'
import { apiLink, getToken } from '../context/helperFunctions'
import {io} from 'socket.io-client'
import DocumentPicker from 'react-native-document-picker'
import { Context } from '../context/createDataContext'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ViewImage from '../components/ViewImage'


const Conversation = (props) => {
    const {username,myPhoto,userPhoto,messages,meId,userId,convIndex} = props.route.params
    const [inpValue,setInpValue] = useState("")
    const [test,setTest] = useState(messages)
    const [file,setFile] = useState()
    const {sendPhotoConv,state} = useContext(Context)
    const [token,setToken] = useState()
    const scrollViewRef = useRef()
    const [photoName,setPhotoName] = useState("")




    

    let socket;
    if(meId){
        socket = io("http://192.168.0.220:4000" , {
            query:{id:meId}
        })
    }

    const data = new FormData()
    data.append("file" ,file)
    data.append("userId" ,userId)


    const sendMessage = (inp) => { 

        if(inp){
            socket.emit("send-message" , {
                userTo:userId,
                image:inp,
                photo:myPhoto,
                meId,
                photoConv:data,
                convIndex
            })

            setTest(prevTest => {
                return [...prevTest , {
                    userTo:userId,
                    image:inp,
                    photo:myPhoto,
                    me:true,
                    meId
                }]
            })
        }else{
            socket.emit("send-message" , {
                userTo:userId,
                text:inpValue,
                photo:myPhoto,
                meId,
                photoConv:data,
                convIndex
            })

            setTest(prevTest => {
                return [...prevTest , {
                    userTo:userId,
                    text:inpValue,
                    photo:myPhoto,
                    me:true,
                    meId
                }]
            })
        }

        setInpValue("")
        setFile("")
    }

    const sendPhoto = async () => {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.images],
        });
        setFile(res)
    }

    useEffect(async () => {
        // lui
        socket.on("get-message" , ({name,image,me,photo,text}) => {
            if(text){
                setTest(prevTest => {
                    return [...prevTest , {name,text,me,photo}]
                })
            }
            if(image){
                setTest(prevTest => {
                    return [...prevTest , {name,image,me,photo}]
                })
            }
        })
        setToken(await getToken())
        console.log("render")
    },[])
    
    return <View style={{flex:1,backgroundColor:"white"}}>
        <View>
            <View style={{flexDirection:"row",alignItems:"center",margin:10,borderBottomColor:"black",borderBottomWidth:.5,paddingBottom:10}}>
                <Image source={{uri:`${apiLink}/images/${userPhoto}`}} style={{width:30,height:30,borderRadius:25}} />
                <TouchableOpacity onPress={() => props.navigation.navigate("UserProfile" , {userId})}>
                    <Text style={{fontSize:12,fontWeight:"bold",marginLeft:5}}>{username}</Text>
                </TouchableOpacity>
            </View>
        </View>
            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
            >
                {test.map((el,index) => {
                    return <View key={index}>
                        {!el.me ? <View style={{flexDirection:"row",alignItems:"center",margin:10,justifyContent:"flex-start"}}>
                            <Image source={{uri:`${apiLink}/images/${el.photo}`}} style={{width:30,height:30,borderRadius:1000}} />
                            {el.text && <Text style={{fontWeight:"bold",fontSize:11,marginLeft:5}}>{el.text}</Text>}
                            {el.image && <TouchableOpacity onPress={() => setPhotoName(el.image)}>
                                <View>
                                    <Image source={{uri:`${apiLink}/images/${el.image}`}} style={{borderRadius:20,marginLeft:5,width:100,height:170}}  />
                                </View>
                            </TouchableOpacity>
                            }
                        </View> : <View style={{flexDirection:"row",alignItems:"center",margin:10,justifyContent:"flex-end"}}>
                            {el.text && <Text style={{fontWeight:"bold",fontSize:11,marginRight:5}}>{el.text}</Text>}
                            {el.image && <TouchableOpacity>
                                <View>
                                    <Image source={{uri:`${apiLink}/images/${el.image}`}} style={{borderRadius:20,marginLeft:5,width:100,height:170}}  />
                                </View>
                                {/* fa cu shared element */}
                            </TouchableOpacity>}

                            <Image source={{uri:`${apiLink}/images/${el.photo}`}} style={{width:30,height:30,borderRadius:1000}} />
                        </View>
                        }
                    </View>
                })}
            </ScrollView>
        <View style={{flexDirection:"row",alignItems:"center",margin:10}}>
            <TouchableOpacity onPress={() => sendPhoto()}>
                <Icon name="photo-camera" size={25} style={{borderWidth:1,borderRadius:50,paddingLeft:4,paddingTop:4,paddingRight:2,paddingBottom:2,borderColor:"#19b5fe",marginRight:3}} color="#19b5fe" />
            </TouchableOpacity>
            <TextInput placeholder="Mesaj..." value={inpValue} onChangeText={setInpValue} style={{borderColor:"black",borderWidth:1,height:40,flex:1,borderRadius:300,paddingLeft:15,fontFamily:"Roboto-Bold",color:"black"}} />
            {/* <TouchableOpacity onPress={() => file ? {sendPhotoConv(data , token) sendMessage()} : sendMessage()}> */}
            <TouchableOpacity onPress={() => {file ? sendPhotoConv(data,userId,myPhoto,meId , token , (inp) => sendMessage(inp),convIndex) : sendMessage()}}>
                <Icon2 name="send-circle" size={35} color="#19b5fe"></Icon2>
            </TouchableOpacity>
        </View>
        <View style={{position:"absolute",top:0,left:0,right:0,bottom:0}}>
        </View>
    </View>
}

export default Conversation