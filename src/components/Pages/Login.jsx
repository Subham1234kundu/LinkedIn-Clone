import React, { useEffect,useState } from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { googleSignInAPI } from '../../api/AuthApi';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from '../common/Loader';

const Login = () => {
  let [loading,setLoading] = useState(true);
  let navigate  = useNavigate();

  const googleSignIn = async ()=>{
    try {
      const res = await googleSignInAPI();
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

  return (
     loading ? <Loader/>:
   <Container >
    
    <Nav>
        <a href="/">
        <img src="/images/login-logo.svg" alt="" />
        </a>
        <div>
          <Join onClick={()=>navigate("/register")}>Join now</Join>
          <SignIn onClick={()=>navigate("/signin")}>Sign in</SignIn>
        </div>
    </Nav>

    <Section>
      <Hero>
        <h1>Welcome to your professional community</h1>
        <img src="/images/login-hero.svg" alt="" />
        
      </Hero>
      <Form>
      
        <Google onClick={googleSignIn}>
          
        <img src="/images/google.svg" alt="" />
        sign in with google
        </Google>
      </Form>
    </Section>
   </Container>
  )
}

export default Login



//styleing part


const Container = styled.div`
padding:0px;
`;
const Nav = styled.div`
max-width:1128px;
margin:auto;
padding:12px 0 16px;
display:flex;
align-items:center;
position:relative;
justify-content:space-between;
flex-wrap:nowrap;

& > a{
    width:135px;
    height:34px;
   @media(max-width: 786px){
    padding: 0 5px;
   }
};
`;

const Join = styled.a`
    font-size: 16px;
    padding: 10px 12px;
    text-decoration: none;
    color: rgba(0,0,0,0.6);
    margin-right: 12px;
    border-radius: 4px;
    &:hover{
      background-color: rgba(0,0,0,0.08);
      color: rgba(0,0,0,0.9);
      text-decoration: none;
    }
`
const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px;
  text-align: center;
  background-color: rgba(0,0,0,0);
  &:hover{
    background-color: rgba(112,181,249,0.15);
  }
`
const Section = styled.section`
  display: flex;
  align-items: center;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  margin: auto;
`

const Hero = styled.div`
  width: 100%;
  h1{
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height:70px;
    @media (max-width: 768px ) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;

    }
  }

  img{
    
    width: 700px;
    height: 670px;
    position: absolute;
    bottom: -2px;
    right: -150px;
    @media(max-width: 786px){
      top:230px;
      width: initial;
      position: initial;
      height: initial;
    }

  }
`
const Form = styled.div`
    margin-top: 100px;
    width: 408px;
    @media(max-width: 768px){
      margin-top: 20px;
    }
`;

const Google = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgba(0 0 0 /60%),
              inset 0 0 0 2px rgba(0 0 0 /0%),
              inset 0 0 0 1px rgba(0 0 0 /0),;
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0,0,0,0.6);
  &:hover{
    color: rgba(0,0,0,0.75);
    background-color: rgba(207,207,207,0.25);
  }
`;

const LinkedInLogin = styled.div`
  
`;

const InputDiv = styled.div`
  
`

const mapStateToProps = (state)=>{
      return {};
};
const mapDispatchToProps = (dispatch)=>{

}

