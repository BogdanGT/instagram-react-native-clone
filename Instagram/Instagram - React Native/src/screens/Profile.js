import React,{useEffect,useState} from 'react'
import {View,Text,Image, FlatList, TouchableOpacity,Dimensions} from 'react-native'
import {apiLink,getUser,getAllPostsFromUser} from '../context/helperFunctions'
import KeyChain from 'react-native-keychain'


const {width} = Dimensions.get("window")

const Profile = (props) => {
    const [user,setUser] = useState([])
    const [userPosts,setUserPosts] = useState([])

    useEffect(async () => {
        setUser(await getUser())
    },[])

    useEffect(async () =>{
        setUserPosts(await getAllPostsFromUser(user._id))
    },[user])
    
    return <View style={{backgroundColor:"white",flex:1}}>
        <Text style={{fontFamily:"Roboto-Bold", fontSize:20,textAlign:"center"}}>Profile</Text>
        <View style={{flexDirection:"row"}}>
            <View>
                <Image source={{uri:`${apiLink}/images/${user.profilePhoto}`}} style={{width:80,height:80,borderRadius:100,margin:10}} />
                <Text style={{textAlign:"center",fontWeight:"bold"}}>{user.username}</Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-around",flex:1,alignItems:"center",marginBottom:30,alignSelf:"center"}}>
                <View style={{flexDirection:"column"}}>
                    <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20}}>{userPosts.length}</Text>
                    <Text style={{fontFamily:"Roboto-Bold"}}>posts</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate("YourFollowers" , {userId:user._id})}>
                <View style={{flexDirection:"column"}}>
                        <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20}}>{user.followers}</Text>
                        <Text style={{fontFamily:"Roboto-Bold"}}>followers</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate("YourFollowed" , {userId:user._id})}>
                    <View style={{flexDirection:"column"}}>
                        <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20}}>{user.following}</Text>
                        <Text style={{fontFamily:"Roboto-Bold"}}>following</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{alignSelf:"flex-end",marginRight:5}}>
            <TouchableOpacity onPress={async () => await KeyChain.resetGenericPassword().then(() => props.navigation.navigate("Login"))}>
                <Text style={{backgroundColor:"red",padding:5,borderRadius:5,color:"white",fontWeight:"bold"}}>LOGOUT</Text>
            </TouchableOpacity>
        </View>
        <FlatList 
            style={{marginTop:20}}
            numColumns={3}
            data={userPosts}
            keyExtractor={el => el._id}
            renderItem={({item}) => {
                return <View>
                    <TouchableOpacity onPress={() => props.navigation.navigate("ViewPost" , {item})}>
                        <Image source={{uri:`${apiLink}/images/${item.photoName}`}} style={{width:width / 3,height:width / 3}} /> 
                    </TouchableOpacity>
                </View>
            }}
        />
    </View>
}

export default Profile