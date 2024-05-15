import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import LikeButton from '../likeButton';
import { getCurrenUser,getAllUsers,deletePost } from '../../../api/FireStore';
import TotalLike from '../likeButton/TotalLike';
import { RxCross1 } from "react-icons/rx";
import { Button, Flex, Modal } from "antd";

const PostCard= ({posts ,id,getEditzData,allImgOpen}) => {
  let navigate = useNavigate();
  const [currentUser,setCurrentUser] = useState({});
  const [allusers,setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);

 
  
  useMemo(()=>{
    getCurrenUser(setCurrentUser);
    getAllUsers(setAllUsers);
  },[]);
  
  return (
    <>
    {!allImgOpen ? 
    <Article key={id}>
                
                <SharedActor>
                  <a onClick={() => navigate("/profile",{
                        state:{ id:posts?.userId , email:posts.userEmail},
                      })}>
                    <img src={allusers.filter((item)=> item.id === posts.userId).map((item)=> item.imageLink)[0]} alt="" />
                    <div>
                      <span >{allusers.filter((user)=> user.id === posts.userId)[0]?.name}</span>
                      <span>{allusers.filter((user)=> user.id === posts.userId)[0]?.headline}</span>
                      <span>{posts.timeStamp}</span>
                    </div>
                  </a>
      
                  <button>
                  {currentUser.id === posts.userId ?
                    <RxCross1 onClick={()=>deletePost(posts.id)}/> :<></>}
                    
                  </button>
                  
                </SharedActor>
                
      
                <Description key={posts.id} dangerouslySetInnerHTML={ {__html:posts.status}}>
                 
                </Description>
      
                <SharedImg>
                  <a>
                    {posts.postImg?<img onClick={() => setImageModal(true)} src={posts.postImg} alt="" />:<></>}
                  </a>
                </SharedImg>
      
                <SocialCounts>
                  <li>
                    <button>
                    <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="" />
                  
                      <span><TotalLike /></span>
                    </button>
                  </li>
      
                  <li>
                    <a> Comments</a>
                  </li>
                </SocialCounts>
      
                <SocialActions>                             
                      
                      <LikeButton userId ={currentUser?.id} postId = {posts.id} currentUser = {currentUser} getEditzData={getEditzData} posts={posts} />
                      

                      
                      <Modal
                        centered
                        open={imageModal}
                        onOk={() => setImageModal(false)}
                        onCancel={() => setImageModal(false)}
                        footer={[]}
                      >
                       
                        <OpenPic
                          onClick={() => setImageModal(true)}
                          src={posts.postImg}
                          className="post-image modal"
                          alt="post-image"
                        />
                        
                      </Modal>
                      
                </SocialActions>

              </Article> :<SharedImg style={allImgOpen?{marginBottom:"30px",marginTop:"30px"}:{}}>
                  <a>
                    {posts.postImg?<img onClick={() => setImageModal(true)} src={posts.postImg} alt="" />:<></>}
                  </a>
                </SharedImg>}

    </>
  )
}

export default PostCard


const Article = styled.div`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
  text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 /15%),0 0 0  rgb(0 0 0 /20%);
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 0px 0px 16px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  a{
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-image: url("/images/user.svg");
      object-fit: cover;

    }
    & > div{
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin-left: 8px;
      overflow: hidden;
    }
    span{
      text-align: left;
      &:first-child{
        font-size: 14px;
        font-weight: 700;
        color: rgba(0,0,0,1);
      }

      &:nth-child(n+1){
        font-size: 12px;
        color: rgba(0,0,0,0.6);
      }
    }
  }

  button{
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
    margin: 15px 0px ;
    cursor: pointer;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0,0,0,0.9);
  font-size: 14px;
  text-align: left;
  margin: auto;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
    
  }
`;

const SocialCounts = styled.ul`
list-style: none;
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  
  border-bottom: 1px solid #e9e5df;
  justify-content: space-between;
  li{
    margin-right: 5px;
    font-size: 12px;
    button{
      display: flex;
      border: none;
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button{
    display: inline-flex;
    align-items:center;
    padding: 8px;
    color: #1a1a1a;
    border: none;
    @media (max-width:768px) {
      span{
        margin-left: 8px;
        
      }
    }
  }
`;
const OpenPic = styled.img`
  width: 100%;
  margin-top: 30px;
  object-fit: cover;

`

