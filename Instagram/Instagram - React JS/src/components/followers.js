import {useContext, useEffect, useState} from 'react'
import {getFollowing ,apiLink, getFollowers} from '../context/helperFunctions'
import {useHistory} from 'react-router-dom'

const Followers = (props) => {
    const {userId,meId} = props
    const [followers,setFollowers] = useState([])
    const history = useHistory()

    console.log(userId)

    useEffect(async () => {
        setFollowers(await getFollowers(userId))
    },[])

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
            {followers.map((el,index) => {
                return <div key={index} style={{display:"flex",margin:10}}>
                    <img src={`${apiLink}/images/${el.photo}`} style={{width:50,height:50,objectFit:"fill",borderRadius:"50%"}} />
                    <h3 onClick={() => goToUserProfile(el.id)} className="username" style={{alignSelf:"center",marginLeft:5}}>{el.username}</h3>
                </div>
            })}
        </div>
    </div>
}

export default Followers