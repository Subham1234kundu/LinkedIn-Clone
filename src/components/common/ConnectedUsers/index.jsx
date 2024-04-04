import { useMemo, useState } from "react";
import styled from "styled-components";
import {  getConnection } from "../../../api/FireStore";
import { MdPersonAddAlt1 } from "react-icons/md";


export default function  ConnectedUsers ({user,getCurrUser,currentUser}){
    
    const[isConnected , setIsConnected] =useState(false);
    
  
    
   


    useMemo(()=>{
        getConnection(currentUser.id,user.id,setIsConnected);
    },[currentUser.id,user.id]);

    
    
    return (
    <GridChield >
       
        <Background src='/images/card-bg.svg' alt="" />
        <ProfileImg src={user.imageLink} alt="" />
        
         
            <h1>{user.name}</h1>
            <p>{user.headline}</p>   

            <div>
            {
                user.collage ? (<h5>{user.collage}</h5>): (<h5>Based on your profile</h5>)
            }
            {
                !isConnected?(<button onClick={()=> getCurrUser(user.id)}><MdPersonAddAlt1 /><h2>Connect</h2></button>):(<button style={{backgroundColor:"black",color:"white"}} onClick={()=> setIsConnected(true)}>pending...</button>)
            }
            
            </div>
    </GridChield>
    );
};

const GridChield = styled.div`
    
    width: 200px;
    height: 255px;
    margin: 6px;
    position: relative;
    cursor: pointer;
    text-align: center;
    overflow: hidden;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 5px;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 /15%),0 0 0  rgb(0 0 0 /20%);
    justify-content: center;
    &:hover{
        box-shadow: 0 7px 0 1px rgb(0 0 0 /17%),0 0 1px  rgb(0 0 0 /20%);
    }
    @media(max-width: 768px){
        width: 170px;
    }
    

    h1{
        font-weight: 600;
        font-size:16px;
        margin-top: 15px;
    }
    p{
        font-weight: 400;
        font-size: 14px;
        color: gray;
        height: 35px;
        padding: 8px;
    }
    h5{
        font-weight: 200;
        font-size: 11px;
        color: gray;
        margin-bottom: 8px;
        
    }

    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 25px;
        align-items: center;
        
    }

    button{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 7px 10px;
        gap: 10px;
        font-size: 16px;
        border-radius: 50px;
        border: 1px solid #005fbe;
        color: #005fbe;
        cursor: pointer;
        width: 90%;
        
        &:hover{
            border: 1px solid #013f7e;
            background-color: #c7ced5;
        }
    }
    
    
`

const ProfileImg = styled.img`
        width: 70px;
        height: 70px;
        background-image: url("images/user.svg");
        object-fit: cover;
        border-radius: 50%;
        position: absolute;
        z-index: 5;
        top: 5%;
        left: 30%;

`;
const Background = styled.img`
    object-fit: cover;
    width: 100%;
    height: 52px;
    margin-bottom: 20px;
`