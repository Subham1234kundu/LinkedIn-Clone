import React,{ useState, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import ModalComponent from '../common/Modal'
import { PostData,getStatus} from '../../api/FireStore';
import { getCurrentTimeStamp } from '../common/LiveMoment'
import GetUniqueId from '../common/GetUniqueId'
import PostCard from '../common/postCard';
import { getAllUsers,updatePost } from '../../api/FireStore';
import { UploadPostImg } from '../../api/ImageUpload';

const Main = ({currentUser,allImgOpen,setAllImgOpen}) => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [status , setStatus] = useState("");
  const [allStatus, setAllStatus] = useState([]);
  const [allusers,setAllUsers] = useState([]);
  const [currentPost , setCurrentPost] = useState({});
  const[isEdit,setIsEdit] = useState(false);
  const [postImg,setPostImg] = useState("");
  const [forArtical ,setForArtical] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  let navigate  = useNavigate();
  
  const sendStatus =  async()=>{
    
    let object = {
      status:status,
      timeStamp:getCurrentTimeStamp('hour'),
      userEmail:currentUser.email,
      userName:currentUser.name,
      postId:GetUniqueId(),
      userId:currentUser.id,
      postImg:postImg,
    }
    
    
    await PostData(object);
    await setmodalOpen(false);
    setIsEdit(false);
    await setStatus("");
  };

  function getEditzData(posts){
    setmodalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts)
    setIsEdit(true);
    
  };

  const updateStatus = async () => {
    setIsUpdating(true); 
    const updatedPostImg = postImg || currentPost.postImg;
  
    await updatePost(currentPost.id, status, updatedPostImg);
    setmodalOpen(false);
    setIsEdit(false);

    setIsUpdating(false); 
    setStatus('');
    setPostImg('');
    setCurrentPost({});
  };
  
  
  useMemo(()=>{
    getStatus(setAllStatus);
    getAllUsers(setAllUsers);
  },[]);
  

  return (
    <Container >
       <Sharebox >
        Share
        <div  >
          <img src={allusers.filter((item)=> item.id === currentUser.id).map((item)=> item.imageLink)[0]} alt=""  onClick={()=>navigate("/profile",{
            state:{id:currentUser.id}
          })}/>
          <button style={{cursor:"pointer"}} onClick={() => {setmodalOpen(true);setIsEdit(false);}}>Start a post</button>
          <ModalComponent 
           modalOpen={modalOpen}
           setmodalOpen={setmodalOpen}
           status={status}
           setStatus={setStatus}
           sendStatus={sendStatus}
           isEdit={isEdit}
           updateStatus={updateStatus}
           currentUser ={currentUser}
           postImg ={postImg}
           setPostImg = {setPostImg}
           UploadPostImg={UploadPostImg}
           currentPost = {currentPost}
           setCurrentPost = {setCurrentPost}
           setForArtical = {setForArtical}
           isUpdating={isUpdating}
           />
        </div>
          
        <div>
          <button onClick={()=>setAllImgOpen(!allImgOpen)} style={{cursor:"pointer"}}>
            <img src="/images/photo-icon.svg" alt="" />
            <span>Photo</span>
          </button>


          <button onClick={() => setmodalOpen(true) && setForArtical} style={{cursor:"pointer"}}>
            <img src="/images/article-icon.svg" alt="" />
            <span>Write article</span>
          </button>
          
        </div>
        <div>
        
       </div>
       </Sharebox>

       

       <div>
       {allStatus.map((posts) => {
          return (
              <div key={posts.id}>
             <PostCard getEditzData={getEditzData} posts={posts} allImgOpen={allImgOpen} />
             </div>
          )
        })}
        
        
       </div>
    </Container>
  )
}

export default Main;

const Container = styled.div`
    grid-area: main;
 `;

 const CommonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 /15%),0 0 0  rgb(0 0 0 /20%);
 `;

const Sharebox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  
  div{
    button{
      outline: none;
      color: rgba(0,0,0,0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;

    }
    &:first-child{
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 8px;
        object-fit: cover;
        background-image: url("images/user.svg");
        
      }
      button{
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0,0,0,0.15);
        background-color: white;
        text-align: left;
      }
    }

    &:nth-child(2){
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button{
        img{
          margin: 0 4px 0 -2px;
        }
        span{
          color: #70b5f9;
        }
      }
    }
  }
`;

