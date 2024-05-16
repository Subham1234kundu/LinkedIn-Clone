import React from 'react'
import { useState ,useEffect} from 'react';

import{ LoginAPI,googleSignInAPI} from '../../api/AuthApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import Loader from '../common/Loader';
import SignInC from '../SignInC';

const SignIn = () => {
  let [loading,setLoading] = useState(true);
    let navigate  = useNavigate();
    const [credentail , setCredentails] = useState({});

  const Login = async()=>{
    try{
      let res = await LoginAPI(credentail.email,credentail.password);
      toast.success('Singned in to Linkedin');
      localStorage.setItem("userEmail",res.user.email);
      navigate("/home");
    }catch(err){
      setLoading(false);
    }
  }

  

  const googleSignIn = ()=>{
    try {
      const res = googleSignInAPI();
      console.log("User signed in:", res.user);
    } catch (err) {
      console.error("Error during sign-in:", err);
    }
  }
  useEffect(()=>{
    onAuthStateChanged(auth,(res)=>{
      if(res?.accessToken){
        navigate("/home");
    }else {
      setLoading(false);
    }
    });
  },[]);
  return loading ? <Loader/> :<SignInC googleSignIn={googleSignIn} Login={Login}
  credentail={credentail} setCredentails = {setCredentails}/>
  
}

export default SignIn


