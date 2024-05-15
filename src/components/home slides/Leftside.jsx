//q:what is usememo in react


import React, { useMemo ,useState} from 'react'
import styled from 'styled-components'
import { getAllUsers } from '../../api/FireStore';
import { useNavigate } from 'react-router-dom';
const Leftside = ({currentUser,allImgOpen}) => {
    const [allusers,setAllUsers] = useState([]);
    const navigate = useNavigate();

    useMemo(()=>{
        
        getAllUsers(setAllUsers);
    },[]);
    
  return (
    
   !allImgOpen? <Container>
   <AddCart>
       <UserInfo>
       <CardBackground/>
       <a onClick={()=>navigate("/profile",{
       state:{id:currentUser.id}
     })}>
           <Photo><img src={currentUser?.imageLink} alt="" /></Photo>
           <Link >Welcome, {currentUser.name}</Link>
           <AddPhotoText>Add aphoto</AddPhotoText>
       </a>

       </UserInfo>
       <Widget >
           <a onClick={()=>navigate("/connections")}>
               <div>
               <span>Connections</span>
               <span>Grow your network</span>
               </div>
               <img src="/images/widget-icon.svg" alt="" />
           </a>
       </Widget>
       <Item>
           <span>
               <img src="/images/item-icon.svg" alt="" />
               My Items
           </span>
       </Item>
   </AddCart>

  
</Container>:<></>
  )
}

export default Leftside;
 const Container = styled.div`
    grid-area:leftside ;
 `

 const AddCart = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    transition: box-shadow 83ms;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 /15%),0 0 0  rgb(0 0 0 /20%);

 `;

const UserInfo = styled.div`
    border-bottom: 1px solid rgba(0,0,0,0.15);
    padding: 12px 12px 16px;
    word-wrap: break-word;
    word-break: break-word;

`;
 const CardBackground = styled.div`
    background: url('/images/card-bg.svg');
    background-position: center;
    background-size: 462px;
    height: 54px;
    margin: -12px -12px 0;
 `;

 const Photo = styled.div`
    box-shadow: none;
    position: relative;
    background-image: url("/images/photo.svg");
    width: 72px;
    height: 72px;
    box-sizing: border-box;
    background-clip: content-box;
    background-color: white;
    background-position: center;
    background-size: 60%;
    background-repeat: no-repeat;
    border: 2px solid white;
    margin: -38px auto 12px;
    border-radius: 50%;
    & > img {
        display: block;
        box-shadow: none;
        position: absolute;
        top: 45px;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        box-sizing: border-box;
        border: 2px solid white;
        margin: -49px 5px 5px 0px;
        border-radius: 50%;
    }

 `;

 const Link = styled.div`
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0,0,0,0.9);
    font-weight: 600;
 `;

 const AddPhotoText = styled.div`
    color: #0a66c2;
    margin-top: 4px;
    font-size: 12px;
    line-height: 1.33;
    font-weight: 400;

 `;

 const Widget = styled.div`
    border-bottom: 1px solid rgba(0,0,0,0.15);
    padding-top: 12px;
    padding-bottom: 12px;
    & > a{
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        align-items:center;
        padding: 4px 12px;

        &:hover{
            background-color: rgba(0,0,0,0.08);
        }
        div{
            display: flex;
            flex-direction: column;
            text-align: left;
            span{
                font-size: 12px;
                line-height: 1.333;
                &:first-child{
                    color: rgba(0,0,0,0.6);
                }
                &:nth-child(2){
                    color: rgba(0,0,0,1);
                }

            }
        }
    }

    svg{
        color: rgba(0,0,0,1);
    }
 `;

 const Item = styled.a`
    border-color: rgba(0,0,0,0.8);
    text-align: left;
    padding: 12px;
    font-size: 12px;
    display: block;
    span{
        display: flex;
        align-items: center;
        color: rgba(0,0,0,1);
    }
    svg{
        color: rgba(0,0,0,0.6);
    }
    &:hover{
        background-color: rgba(0,0,0,0.08);
    }
 `;

 const CommunityCard = styled(AddCart)`
    padding: 8px 0 0;
    text-align: left;
    display: flex;
    color: black;
    flex-direction: column;
    a{
        color: black;
        padding: 4px 12px 4px 12px;
        font-size: 12px;
        
        &:hover{
            color: #0a66c2;
        }
        span{
            display: flex;
            align-items: center;
            justify-content: space-between ;
        }
        &:last-child{
                color: rgba(0,0,0,0.6);
                text-decoration: none;
                padding: 12px;
                border-top: 1px solid #d6cec2;
                &:hover{
                    background-color: rgba(0,0,0,0.08);
                }
        }
    }

 `





