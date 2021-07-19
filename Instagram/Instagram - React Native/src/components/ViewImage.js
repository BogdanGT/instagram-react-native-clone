import React , {useRef, useState} from 'react'
import {View,Animated, Image,Dimensions, TouchableOpacity} from 'react-native'
import { apiLink } from '../context/helperFunctions'

const {width,height} = Dimensions.get("screen")

const ViewImage = (props) => {


    return <View>
        <TouchableOpacity>
            <View>
                <Image source={{uri:`${apiLink}/images/${props.img}`}} style={{borderRadius:20,marginLeft:5,width:null,flex:1}}  />
            </View>
        </TouchableOpacity>
    </View>
}

export default ViewImage