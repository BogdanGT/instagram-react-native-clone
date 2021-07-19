import React,{useState,useEffect} from 'react'
import {View,FlatList,TouchableOpacity,Image,Dimensions, Text} from 'react-native'
import {getAllPosts,apiLink} from '../context/helperFunctions'

const {width} = Dimensions.get("window")


const Search = (props) => {
    const [posts,setPosts] = useState([])

    useEffect(async () => {
        setPosts(await getAllPosts())
    },[])
    return <View style={{backgroundColor:"white",flex:1}}>
        <Text style={{fontFamily:"Roboto-Bold",textAlign:"center",fontSize:20,marginBottom:20,marginTop:10}}>All posts</Text>
        <FlatList 
            data={posts.allPost}
            keyExtractor={el => el._id}
            numColumns={3}
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

export default Search