import {useState,useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../context/dataContext'
import { getToken } from '../context/helperFunctions'

const AddPost = () => {
    const [desc,setDesc] = useState("")
    const [file,setFile] = useState("")
    const {addPost} = useContext(Context)
    const token = getToken()
    const history = useHistory()

    if(!token){
        console.log(token)
        history.push("/")
      }

    const data = new FormData()
    data.append("file" , file)
    data.append("description" , desc)
    return <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flex:1}}>
        <input onInput={(e) => setDesc(e.target.value)} style={{marginBottom:20}} className="inputStyle" type="text" />
        <input onInput={e => setFile(e.target.files[0])} type="file" />
        <button onClick={() => {addPost(data , token);history.push("/home")}} style={{padding:10}}>Add</button>
    </div>
}

export default AddPost