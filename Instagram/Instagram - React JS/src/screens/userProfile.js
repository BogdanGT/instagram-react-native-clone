import {useEffect,useState} from 'react'
import { getUser,getAllPostsFromUser,apiLink, getUserById,getToken } from '../context/helperFunctions'
import ViewPost from '../components/viewPost'
import {GrClose,IoAddCircleOutline,AiFillCompass} from 'react-icons/all'
import Following from '../components/following'
import Followers from '../components/followers'
import {useHistory, useLocation} from 'react-router-dom'
import Cookies from 'universal-cookie'

const UserProfile = (props) => {
    const [user,setUser] = useState([])
    const [me,setMe] = useState([])
    const [userPosts,setUserPosts] = useState([])
    const [postOn,setPostOn] = useState()
    let [seePost,setSeePost] = useState([])
    const location = useLocation()
    const [followingOn,setFollowingOn] = useState()
    const [followersOn,setFollowersOn] = useState()
    const token = getToken()
    const history = useHistory()
    const cookies = new Cookies()

    if(!token){
        console.log(token)
        history.push("/")
      }

    useEffect(async () => {
        setUser(await getUserById(location.state.userId))
        setUserPosts(await getAllPostsFromUser(location.state.userId,token))
    },[location])


    useEffect(async () => {
        setMe(await getUser(token))
    },[])
    

    return <div>
              <nav style={{display:"flex",justifyContent:"space-evenly",width:"100%",marginTop:20}}>
        <h1 onClick={() => history.push("/home")}>Instagram</h1>
        <div style={{display:"flex"}}>
          <div onClick={() => history.push("/addPost")} style={{marginRight:10}}>
            <IoAddCircleOutline size={35} />
          </div>
          <div onClick={() => history.push("/allPosts")} style={{marginRight:10}}>
            <AiFillCompass size={35} />
          </div>
          {user.profilePhoto && <img 
              onClick={() => history.push({
                  pathname: `/profile`,
                  state: { userId: user._id }
              })} 
              src={`${apiLink}/images/${user.profilePhoto}`} 
              style={{width:30,height:30,borderRadius:"50%",alignSelf:"center"}} 
            />}
        </div>
      </nav>
      <div style={{display:"flex",justifyContent:"space-evenly"}}>
        {user.profilePhoto && <img src={`${apiLink}/images/${user.profilePhoto}`} style={{width:150,height:150,borderRadius:100,objectFit:"cover"}} />}
        <div>
        <h1>{user.username}</h1>
        <h1>{user.email}</h1>
        <div style={{display:"flex",justifyContent:"space-between",margin:"20px 0 20px 0",width:500}}>
            <h2>{userPosts && userPosts.length} postari</h2>
            <h2 style={{cursor:"pointer"}} onClick={() => {setFollowersOn(true)}}>{user.followers} de urmaritori</h2>
            <h2 style={{cursor:"pointer"}} onClick={() => {setFollowingOn(true)}}>{user.following} de urmariri</h2>
        </div>
      </div>
    </div>
    <div style={{display:"flex",width:906,flexWrap:"wrap",margin:"20px auto"}}>
        {userPosts && userPosts.map((el,index) => {
            return <div key={index} onClick={() => {setPostOn(true);setSeePost(...seePost , el)}}>
                <img src={`${apiLink}/images/${el.photoName}`} style={{width:300,height:300,objectFit:"cover",margin:1}} />
            </div>
        })}
    </div>
        {postOn && <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            <div onClick={() => setSeePost([])} >
                <GrClose style={{position:"absolute",top:10,right:10}} color="red" size={30} onClick={() => setPostOn(false)} />
            </div>
            <ViewPost seePost={seePost} user={user} />
        </div>
        }
        {followingOn && <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            <div onClick={() => {setFollowingOn()}} >
                <GrClose style={{position:"absolute",top:10,right:10}} color="red" size={30} onClick={() => setPostOn(false)} />
            </div>
            <Following meId={me._id} userId={user._id}/>
        </div>
        }
        {followersOn && <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            <div onClick={() => {setFollowersOn()}} >
                <GrClose style={{position:"absolute",top:10,right:10}} color="red" size={30} onClick={() => setPostOn(false)} />
            </div>
            <Followers meId={me._id} userId={user._id}/>
        </div>
        }
    </div>
}

export default UserProfile