import {useContext, useEffect, useState} from 'react'
import { getFollowers, getFollowing ,apiLink} from '../context/helperFunctions'

const WhoLikes = (props) => {
    const {seePost} = props


    return <div>
        <div style={{width:400,height:500,backgroundColor:"white",borderRadius:20,overflowY:"scroll"}}>
            {seePost.whoLikes.map((el,index) => {
                return <div key={index} style={{display:"flex",margin:10}}>
                    <img src={`${apiLink}/images/${el.photo}`} style={{width:50,height:50,borderRadius:"50%"}} />
                    <h4 style={{alignSelf:"center",marginLeft:5}}>{el.username}</h4>
                </div>
            })}
        </div>
    </div>
}

export default WhoLikes