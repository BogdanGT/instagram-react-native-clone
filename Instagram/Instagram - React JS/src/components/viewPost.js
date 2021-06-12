import {useState,useContext, useEffect} from 'react'
import {apiLink, getToken, getUser} from '../context/helperFunctions'
import Like from './like'
import WhoLikes from './whoLikes'
import {FaComment,BsFillTrashFill, GrClose} from 'react-icons/all'
import { Context } from '../context/dataContext'

const ViewPost = (props) => {
    const {seePost,user} = props
    const {addComment,deleteComment,followUser} = useContext(Context)
    const token = getToken()
    const [comment,setComment] = useState("")
    const [whoLikesOn,setWhoLikesOn] = useState()
    const [animFollow,setAnimFollow] = useState()

    let isLiked
    if(user.likedPosts){
        isLiked = user.likedPosts.includes(seePost._id)
    }

    useEffect(() => {
        if(user.followedPeople){
          setAnimFollow(user.followedPeople.includes(seePost.user._id))
        }
    },[user.followedPeople])

    // fix bugs pe la login register sa nu accesezi daca nu ai token
    // sa poti sa postezi 

    const followBtn = () => {
        if(seePost.user._id != user._id){
            if(animFollow){
                return <div style={{cursor:"pointer"}} onClick={() => {followUser(seePost.user._id,token);setAnimFollow(false)}}>UNFOLLOW</div>
            }else {
                return <div style={{cursor:"pointer"}} onClick={() => {followUser(seePost.user._id,token);setAnimFollow(true)}}>FOLLOW</div>
            }
        }
    }

    const commentBtn = (el) => {
        if(seePost.user._id != user._id){
            return <div style={{alignSelf:"center"}} onClick={() => deleteComment({postId:seePost._id , commId:el._id} , token)}>
                <BsFillTrashFill style={{alignSelf:"center"}} size={20} />
            </div>
        }
    }


    return <div style={{display:"flex"}}>
        <img src={`${apiLink}/images/${seePost.photoName}`} style={{width:600,height:600,backgroundColor:"red",objectFit:"cover"}} />
        <div style={{width:350,height:600,backgroundColor:"white"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",margin:10}}>
                    <img src={`${apiLink}/images/${seePost.user.profilePhoto}`} style={{width:40,height:40,borderRadius:"50%"}} />
                    <div style={{alignSelf:"center",marginLeft:10,fontSize:14,fontWeight:"bold"}}>{seePost.user.username}</div>
                </div>
                <div style={{marginRight:10}}>{followBtn()}</div>
            </div>
            <hr />
            <div style={{backgroundColor:"white",height:"69%",overflowY: "scroll"}}>
                {seePost.comments.map((el,index) => {
                    return <div key={index} style={{display:"flex",margin:10}}>
                        <img src={`${apiLink}/images/${el.photo}`} style={{width:50,height:30,borderRadius:"30px"}} />
                        <div style={{display:"flex",wordWrap:"break-word"}}>
                            <div style={{marginLeft:10,width:270,lineHeight:1.5}}><span style={{fontWeight:"bold",marginRight:5}}>{el.username}</span>{el.comment}</div>
                            {commentBtn(el)}
                        </div>
                        
                    </div>
                })}
            </div>
            <div style={{borderTop:"1px solid black",borderBottom:"1px solid black",padding:"10px 15px 10px 15px"}}>
                <div style={{display:"flex"}}>
                    <Like isLiked={isLiked} postId={seePost._id} />
                    <FaComment size={35} style={{marginTop:2,marginLeft:5}} />
                </div>
                <h4 onClick={() => setWhoLikesOn(true)} style={{marginLeft:5}}>{seePost.like} aprecieri</h4>
            </div>
            <div style={{display:"flex",justifyContent:"space-around",backgroundColor:"white",padding:"10px 10px 10px 10px"}}>
                <input onInput={e => setComment(e.target.value)} type="text" style={{border:"none",fontSize:14}} placeholder="Adauga un comentariu..." />
                <h4 onClick={() => addComment({postId:seePost._id , comment} , token)} style={{color:"blue"}}>Posteaza</h4>
            </div>
            {whoLikesOn && <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                <div onClick={() => {setWhoLikesOn(false)}} >
                    <GrClose style={{position:"absolute",top:10,right:10}} color="red" size={30} />
                </div>
                <WhoLikes seePost={seePost} />
            </div>
            }
        </div>
    </div>
}

export default ViewPost