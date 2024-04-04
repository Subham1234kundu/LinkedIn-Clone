import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Button, Modal,Progress } from 'antd'
import { AiFillPicture } from "react-icons/ai";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EmojiPicker,{Emoji} from 'emoji-picker-react';

const ModalComponent = ({modalOpen,setmodalOpen,setStatus,status,sendStatus,isEdit,updateStatus,currentUser,setPostImg,postImg,UploadPostImg,currentPost,setCurrentPost,setForArtical}) => {
  
  const [progress,setProgress] = useState(0);

  return (
    <>
      <Modal

        centered
        open={modalOpen}
        onOk={() => {
          setStatus("");
          setmodalOpen(false);
          setPostImg("");
          setCurrentPost({});
          setEmojis([]);
          setShowPicker(false);
        }}
        onCancel={() =>{ 
          setStatus("");
          setmodalOpen(false);
          setPostImg("");
          setCurrentPost({});
          setEmojis([]);
          setShowPicker(false);
        }}
        footer = {[
          
            <Button
             key="submit" 
             type='primary' 
             disabled ={status.length || postImg?.length >0  > 0 ? false:true} 
             onClick={isEdit  ? updateStatus : sendStatus}>
               {isEdit  ? "Update":"Post"}
            </Button>
            
        ]}
      >
        <ModalDivs >
          <UserNameImage>
              <img src={currentUser.imageLink} alt="" />
              <div>
                <h1>{currentUser.name}</h1>
                <h5>post to anyone</h5>
              </div>
              
          </UserNameImage>
          
        
          <ReactQuill
        
        theme='snow'
        value={status}
        onChange={setStatus}
        placeholder='Share something useful...'
        
      />
        
        {
          progress === 0 || progress === 100 ?<></>:<ProgressBar><Progress type="circle" percent={progress} /> <p>processing...</p>
          </ProgressBar>
        }
        {postImg?.length > 0 || currentPost?.postImg?.length ? <img src={postImg  || currentPost?.postImg} alt='postImg'/>:<></>}
        <h5>
        

        <label htmlFor="pic-Upload">
        <AiFillPicture  size={27} className='pic-icon'/></label>
        <input type="file" id='pic-Upload' hidden onChange={(e)=>UploadPostImg(e.target.files[0],setPostImg,setProgress)}/>
        
        </h5>
        </ModalDivs>
        
      </Modal>
    </>
  );
}

export default ModalComponent


const ModalDivs = styled.div`
    
    .ql-container{
        background-color: white;
        border: none;
        outline: none;
        font-size: 16px;
        width: 85%;
        font-weight: 500;
        height: 120px;
        
    }
    .ql-toolbar.ql-snow{
      border: none;
      
    }
    h5{
      display: flex;
      flex-direction: column;
      
      margin-left: 10px;
    }
    .pic-icon{
      color: #646464;
      cursor: pointer;
      margin-top: 20px;
    }

    img{
      width: 100%;
      height: 50%;
      object-fit: cover;
    }
`;

const UserNameImage = styled.div`
  cursor: pointer;
  display: flex;
  margin-left: 10px;
  padding: 10px;
  margin-bottom: 30px;
  img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-right: 8px;
        object-fit: cover;
        background-image: url("images/user.svg");
        
    }

    h1{
      font-size: 20px;
      font-weight: 500;
      margin-left: 5px;
    }
    h5{
      font-weight: 400;

    }

`;

const ProgressBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`
