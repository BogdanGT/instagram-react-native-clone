import {useContext, useEffect, useState} from 'react'
import {getFollowing ,apiLink, getToken} from '../context/helperFunctions'
import {useHistory} from 'react-router-dom'

const Friends = (props) => {
    const {userId,meId} = props
    const [following,setFollowing] = useState([])
    const history = useHistory()
    const token = getToken()

    console.log(userId)

    useEffect(async () => {
        setFollowing(await getFollowing(userId,token))
    },[userId])

    const goToUserProfile = (id) => {
        if(meId == id){
            history.push({
                pathname: `/profile`,
                state: { userId: id }
            })
        }else{
            history.push({
                pathname: `/profile/${id}`,
                state: { userId: id }
            })
        }
    }

    console.log(userId)

    return <div>
        <div style={{width:500,height:500,overflowY:"scroll",borderRadius:20,backgroundColor:"white"}}>
        <h2 style={{textAlign:"center",margin:"5px 0"}}>Following</h2>
            {following.map((el,index) => {
                return <div key={index} style={{display:"flex",margin:10}}>
                    <img src={`${apiLink}/images/${el.profilePhoto}`} style={{width:50,height:50,objectFit:"fill",borderRadius:"50%"}} />
                    <h3 onClick={() => goToUserProfile(el._id)} className="username" style={{alignSelf:"center",marginLeft:5}}>{el.username}</h3>
                </div>
            })}
        </div>
    </div>
}

export default Friends