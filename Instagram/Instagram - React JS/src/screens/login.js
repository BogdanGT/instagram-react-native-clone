import { useEffect, useState,useContext } from 'react';
import '../App.css';
import {useHistory} from 'react-router-dom'
import Cookies from 'universal-cookie';
import {Context} from '../context/dataContext'



function Login() {
  const cookies = new Cookies()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const {login} = useContext(Context)
  let history = useHistory();

  useEffect(() => {
    if(cookies.get("token")){
        history.push("/home");
    }else{
        history.push("/");
    }
  },[])

  // cookies.remove("token")


  return (
    <div className="container">
      <div style={{display:"flex",flexDirection:"column"}}>
        <input placeholder="email" onInput={(e) => setEmail(e.target.value)} type="email" className="inputStyle"  />
        <input placeholder="password" onInput={(e) => setPassword(e.target.value)} type="password" className="inputStyle"  />
      </div>
      <button style={{padding:"10px 30px 10px 30px"}} onClick={() => login({email,password} , () => history.push("/home"))}>LOGIN</button>

      <h3 style={{cursor:"pointer",marginTop:100}} onClick={() => history.push("/register")}>Register</h3>
    </div>
  );
}

export default Login;
