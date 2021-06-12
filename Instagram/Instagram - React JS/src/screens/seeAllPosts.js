import { useState,useContext, useEffect } from 'react';
import '../App.css';
import {getToken,getPosts,apiLink,getUser} from '../context/helperFunctions'
import {IoAddCircleOutline, GrClose,AiFillCompass} from 'react-icons/all'
import {useHistory} from 'react-router-dom'
import ViewPost from '../components/viewPost';

function Home() {
    const token = getToken()
    const [posts,setPosts] = useState([])
    const [me,setMe] = useState([])
    const history = useHistory()
    const [viewPost,setViewPost] = useState()

    useEffect(async () => {
      setPosts(await getPosts(token))
      setMe(await getUser(token))
    },[])

    const [seePost,setSeePost] = useState([])

    if(!token){
      console.log(token)
      history.push("/")
    }

    


  return (
    <div>
      <nav style={{display:"flex",justifyContent:"space-evenly",width:"100%",marginTop:20}}>
        <h1 onClick={() => history.push("/home")}>Instagram</h1>
        <div style={{alignItems:"center",display:"flex"}}>
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
              style={{width:30,height:30,borderRadius:"50%"}} 
              />
            }
        </div>
      </nav>
      <h2 style={{textAlign:"center",margin:"10px 0"}}>See all posts</h2>
      <div style={{display:"flex",flexWrap:"wrap"}}>
        {posts.map((el,index) => {
          return <div key={index} style={{}}>
            <img onClick={() => {setSeePost(el);setViewPost(true)}} src={`${apiLink}/images/${el.photoName}`} style={{width:300,height:300,objectFit:"cover",margin:1}} />
          </div>
          })}
        </div>
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
