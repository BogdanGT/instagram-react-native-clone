import { useState,useContext } from 'react';
import '../App.css';
import {useHistory} from 'react-router-dom'
import {Context} from '../context/dataContext'

function Register() {
  const [file,setFile] = useState()
  const [username,setUsername] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const {register} = useContext(Context)

  let history = useHistory()

  const data = new FormData()
  data.append("file" , file)
  data.append("email" , email)
  data.append("password" , password)
  data.append("username" , username)

  return (
    <div className="container">
      <div style={{display:"flex",flexDirection:"column"}}>
        <input placeholder="username" onInput={(e) => setUsername(e.target.value)} type="text" className="inputStyle" />
        <input placeholder="email" onInput={(e) => setEmail(e.target.value)} type="email" className="inputStyle"  />
        <input placeholder="password" onInput={(e) => setPassword(e.target.value)} type="password" className="inputStyle"  />
        <input onInput={(e) => setFile(e.target.files[0])} type="file" className="inputStyle"  />
      </div>
      <button style={{padding:"10px 30px 10px 30px"}} onClick={() => register(data , () => history.push("/home"))}>REGISTER</button>
    </div>
  );
}

export default Register;
