import React from 'react'
import styled from "styled-components";


const SignInC = ({googleSignIn,Login,credentail,setCredentails}) => {
    return (
    
        <SinePage>
            <Nav>
            <img src="/images/login-logo.svg" alt="" />
            </Nav>
    
            <Form>
                <ForStyle>
            <div>
            <h1>Sign in</h1>
            <p>Stay updated on your professional world</p>
            </div>
    
              
              <InputDiv>
              <input type="email" placeholder='Enter or Phone' onChange={(e)=>setCredentails({...credentail, email:e.target.value})}/>
              <input type='password' placeholder='Password'onChange={(e)=>setCredentails({...credentail, password:e.target.value})}/>
              </InputDiv>
              <Button onClick={Login}>
                    Sign in
              </Button>
              
              <hr data-content="or"/>
    
              <Google onClick={googleSignIn}>
                <img src="/images/google.svg" alt="" />
                sign in with google
               </Google>
              </ForStyle>
              <Footer>
                <p>New to linkdin? <span onClick={()=>navigate("/register")}>Join now</span></p>
              </Footer>
              </Form>
    
        </SinePage>
      )
    }

export default SignInC

const SinePage = styled.div`
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
    }
    p{
        color: rgba(0,0,0,0.6);
        font-size: 14px;
        margin-bottom: 20px;
    }

    hr{
        line-height: 1em;
        position: relative;
        outline: 0;
        border: 0;
        color: #212121;
        text-align: center;
        height: 1.5em;
        opacity: .5;

        &:before {
        content: '';
        background: linear-gradient(to right, #808080, #212121, #808080);
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        height: 1px;
        }
        &:after {
        content: attr(data-content);
        position: relative;
        display: inline-block;
        color: #212121;
        padding: 0 .5em;
        line-height: 1.5em;
        color: #212121;
        background-color: #e3e3e3;
        }
    }
    
`;

const ForStyle = styled.div`
    
`

const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap:20px;
    margin-bottom: 37px;
    input{
        width: 307px;
        height: 32px;
        font-size :15px ;
        outline:none;
        border: 1px solid #212121;
        box-shadow: inset 0 0 0 1px rgba(0 0 0 /60%),
              inset 0 0 0 2px rgba(0 0 0 /0%),
              inset 0 0 0 1px rgba(0 0 0 /0),;
        border-radius: 4px;
        padding: 8px;
        
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
        width: 320px;
        border-radius: 30px;
        border: none;
        font-weight: 600;
        font-size: 16px;
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
  width: 100%;
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