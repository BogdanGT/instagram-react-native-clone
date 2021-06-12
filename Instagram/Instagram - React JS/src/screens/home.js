import { useState,useContext, useEffect } from 'react';
import '../App.css';
import {Context} from '../context/dataContext'
import {getToken,getFollowedPosts,apiLink,getUser} from '../context/helperFunctions'
import {FaComment, GrClose} from 'react-icons/all'
import Like from '../components/like'
import {useHistory} from 'react-router-dom'
import ViewPost from '../components/viewPost';
import {AiFillCompass,IoAddCircleOutline} from 'react-icons/all'

function Home() {
    const token = getToken()
    const [posts,setPosts] = useState([])
    const [me,setMe] = useState([])
    const history = useHistory()
    const [viewPost,setViewPost] = useState()

    useEffect(async () => {
      setMe(await getUser(token))
      setPosts(await getFollowedPosts(token))
    },[])

    if(!token){
      console.log(token)
      history.push("/")
    }

    let isLiked;

    const [seePost,setSeePost] = useState([])

  return (
    <div className="container">
      <nav style={{display:"flex",justifyContent:"space-evenly",width:"100%",marginTop:20}}>
        <h1 onClick={() => history.push("/home")}>Instagram</h1>
        <div style={{display:"flex"}}>
          <div onClick={() => history.push("/addPost")} style={{marginRight:10}}>
            <IoAddCircleOutline size={35} />
          </div>
          <div onClick={() => history.push("/allPosts")} style={{marginRight:10}}>
            <AiFillCompass size={35} />
          </div>
          {me.profilePhoto && <img 
              onClick={() => history.push({
                  pathname: `/profile`,
                  state: { userId: me._id }
              })} 
              src={`${apiLink}/images/${me.profilePhoto}`} 
              style={{width:30,height:30,borderRadius:"50%",alignSelf:"center"}} 
            />}
        </div>
      </nav>
        {posts.map((el,index) => {
          console.log(el)
          return <div key={index} style={{marginTop:50,backgroundColor:"white"}}>
            <div style={{display:"flex",marginBottom:10}}>
              <img src={`${apiLink}/images/${el.user.profilePhoto}`} style={{width:50,height:50,borderRadius:"50%"}} />
              <h3 style={{alignSelf:"center",marginLeft:10}}>{el.user.username}</h3>
            </div>
            <img src={`${apiLink}/images/${el.photoName}`} style={{width:600,height:600,objectFit:"cover"}} />
            <div>
              {me.likedPosts ? isLiked = me.likedPosts.includes(el._id) : null}
              {console.log(isLiked)}
              <h4>{el.like} aprecieri</h4>
              <div style={{display:"flex"}}>
                <Like isLiked={isLiked} postId={el._id} />
                <div onClick={() => {setViewPost(true);setSeePost(...seePost , el)}}>
                  <FaComment color="black" size={35} style={{marginLeft:10}} />
                </div>
              </div>
              <h4>{el.description}</h4>
            </div>
          </div>
        })}
        {viewPost && <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            <div onClick={() => setSeePost([])} >
                <GrClose style={{position:"absolute",top:10,right:10}} color="red" size={30} onClick={() => setViewPost(false)} />
            </div>
            <ViewPost seePost={seePost} user={me} />
        </div>
        }
    </div>
  );
}

export default Home;
