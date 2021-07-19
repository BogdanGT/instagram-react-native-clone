import React,{useState,useEffect} from 'react'
import {View,Text, Image, TouchableWithoutFeedback, FlatList, TouchableOpacity, StatusBar} from 'react-native'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/Ionicons'
import {getToken,apiLink,getUser,getAllPostsFromFollowed} from '../context/helperFunctions'
import Like from '../components/like'


const Home = (props) => {
    const [token,setToken] = useState("")
    const [posts,setPosts] = useState([])
    const [user,setUser] = useState([])
    let isLiked;

    useEffect(async () => {
        setToken(await getToken())
        setPosts(await getAllPostsFromFollowed())
        setUser(await getUser())
    },[])

    return <View style={{backgroundColor:"white",flex:1}}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />

        <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:10}}>
            <Text style={{fontSize:25,fontFamily:"Roboto-BoldItalic"}}>Instagram</Text>
            <TouchableWithoutFeedback onPress={() => props.navigation.navigate("AddPost")}>
                <Icon3 name="ios-add-circle-outline" size={30} style={{alignSelf:"center"}} />
            </TouchableWithoutFeedback>
        </View>
        {/* Incepe postarea */}
        <FlatList 
            data={posts}
            keyExtractor={el => el._id}
            renderItem={({item}) => {
                // console.log(item)
                // console.log("asd")
                return <View style={{marginTop:30}}>
                    <View style={{flexDirection:"row",marginHorizontal:10,marginVertical:5}}>
                        <Image source={{uri:`${apiLink}/images/${item.user.profilePhoto}`}} style={{width:35,height:35,backgroundColor:"black",borderRadius:25}} />
                        <TouchableOpacity style={{alignSelf:"center"}} onPress={() => props.navigation.navigate("UserProfile" , {userId:item.user._id})}>
                            <Text style={{marginLeft:5,fontFamily:"Roboto-Bold"}}>{item.user.username}</Text>
                        </TouchableOpacity>
                    </View>
                    <Image source={{uri:`${apiLink}/images/${item.photoName}`}} style={{backgroundColor:"white",width:null,height:300}} />
                    <View style={{flexDirection:"row",marginHorizontal:10,alignItems:"center"}}>
                        {user.likedPosts ? isLiked = user.likedPosts.includes(item._id) : null}
                        <Like isLiked={isLiked} postId={item._id} token={token} />
                        <TouchableOpacity onPress={() => props.navigation.navigate("AddComment" , {postId:item._id,comments:item.comments,userId:user._id})}>
                            <Icon2 name="comment-o" size={25} style={{marginLeft:10}} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{marginLeft:10,fontFamily:"Roboto-Bold"}}>{item.description}</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate("WhoLikes" , {whoLikes : item.whoLikes,userId:user._id})}>
                        <Text style={{marginLeft:10,fontFamily:"Roboto-Bold"}}>{item.like} aprecieri</Text>
                    </TouchableOpacity>
                </View>
            }}
        />
    </View>
}

export default Home