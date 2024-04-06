import React from 'react'
import { useState } from 'react';
import { googleSignInAPI,RegisterAPI } from '../../api/AuthApi';
import { postUsersData } from '../../api/FireStore';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GetUniqueId from '../common/GetUniqueId';
const Register = () => {
  let navigate  = useNavigate();
    const [credentail , setCredentails] = useState({});
  const register = async()=>{
    try{
      let res = await RegisterAPI(credentail.email,credentail.password);
      toast.success('Accunt Created');
      postUsersData({name:credentail.name,email:credentail.email});
      postUsersData({
        userId:GetUniqueId(),
        name:credentail.name,
        email: credentail.email
      })
      navigate("/home");
      localStorage.setItem("userEmail",res.user.email);
      console.log(res)
    }catch(err){
      console.log(err);
      toast.error("Can't create your Accunt");
    }
  }

  const googleSignIn = ()=>{
    let res =  googleSignInAPI()
    console.log(res)
  }

  return (
    <RegisterPage>
    <Nav>
    <img src="/images/login-logo.svg" alt="" />
    </Nav>

    <Form>
        
    <div>
    <h1>Make the most of your professional life</h1>
    </div>

      
      <InputDiv>
      <input type="text" placeholder='Your name' onChange={(e)=>setCredentails({...credentail, name:e.target.value})} />
      <input type="email" placeholder='Enter or Phone' onChange={(e)=>setCredentails({...credentail, email:e.target.value})}/>
      <input type='password' placeholder='Password(6 or more charecters)'onChange={(e)=>setCredentails({...credentail, password:e.target.value})}/>
      </InputDiv>
      <p>By clickin and join you agree to the linkdin <span>User Agreement</span> <span>Privacy Policy</span>and <span>Cookie Policy</span></p>
      <Button onClick={register}>
            Agree & Join
      </Button>
      
      

      <Google onClick={googleSignIn}>
        <img src="/images/google.svg" alt="" />
        sign in with google
       </Google>
     
      <Footer>
        <p>Already on Linkedin? <span onClick={()=>navigate("/signin")}>Sign in</span></p>
      </Footer>
      </Form>

</RegisterPage>
  )
}

export default Register





const RegisterPage = styled.div`
    padding: 0;
`;



const Nav = styled.div`
    margin-bottom:60px;
   img{
    width:135px;
    height:34px;
    margin:10px;
    text-align: start;
    align-items: start;
    @media(max-width: 786px){
     margin: 0;
     width: 120px;
     height: 30px;
   }
   }
   align-items: start;
    @media(max-width: 786px){
     margin-bottom: 50px;
   }


`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    

    h1{
        margin-bottom:3px;
        font-size: 37px;
        font-weight: 500;
        margin-bottom: 26px;

        @media(max-width: 786px){
          font-size: 21px;
          margin-bottom: 30px;
        }
    }

    
    p{
        color: rgba(0,0,0,0.6);
        font-size: 14px;
        @media(max-width: 786px){
          
          font-size :8px ;
        }
    }
    span{
      color:#0a66c2 ;
    }

    
    
`;



const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap:20px;
    margin-bottom: 37px;
    input{
        width: 600px;
        height: 28px;
        font-size :15px ;
        outline:none;
        border: 1px solid #212121;
        box-shadow: inset 0 0 0 1px rgba(0 0 0 /60%),
              inset 0 0 0 2px rgba(0 0 0 /0%),
              inset 0 0 0 1px rgba(0 0 0 /0),;
        border-radius: 4px;
        padding: 8px;
        @media(max-width: 786px){
          width: 350px;
          height: 20px;
          border-radius: 10px;
          font-size :12px ;
        }
        
    }
    input:focus{
        border: 1px solid #0a66c2;
    }
    
`;

const Button = styled.button`
        background-color: #0a66c2;
        color: white;
        cursor: pointer;
        height: 56px;
        width: 608px;
        border-radius: 30px;
        border: none;
        font-weight: 600;
        font-size: 18px;
        margin-bottom:40px;
        @media(max-width: 786px){
          width: 365px;
          height: 45px;
          border-radius: 10px;
          font-size :12px ;
        }
        &:focus{
            background-color: #0955a2;
        }
`;

const Google = styled.button`
  display: flex;
  cursor: pointer;
  border: 1px solid #212121;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 608px;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgba(0 0 0 /60%),
              inset 0 0 0 2px rgba(0 0 0 /0%),
              inset 0 0 0 1px rgba(0 0 0 /0),;
  vertical-align: middle;   
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0,0,0,0.6);
  &:hover{
    color: rgba(0,0,0,0.75);
    background-color: rgba(207,207,207,0.25);
  }
  margin-bottom: 20px;
  @media(max-width: 786px){
          width: 365px;

        }

`;

const Footer = styled.div`
    p{
        font-size: 17px;
    }
    span{
        color: #0a66c2;
        font-size: 17px;
        cursor: pointer;
    }
`;