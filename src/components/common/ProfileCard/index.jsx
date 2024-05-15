import React ,{useState, useEffect, useMemo} from 'react'
import ProfileEdit from '../profile.Edit/ProfileEdit';
import AddPicModal from './AddPicModal';
import styled from 'styled-components'
import { MdOutlineEdit } from "react-icons/md";
import { getSingleStatus,getSingleUser ,editProfile, getStatus, getAllUsers} from '../../../api/FireStore';
import PostCard from '../postCard';
import { useLocation } from 'react-router-dom';
import { UploadImg as UploadImgApi, UploadPostImg } from '../../../api/ImageUpload';
import {  Modal } from "antd";
import ModalComponent from '../Modal';


const ProfileCard = ({currentUser}) => {
  let location = useLocation();
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalOpenEd, setModelOpenEd] = useState(false)
  const [addPicModalPage, setAddPicModalPage] = useState(false);
  const [status , setStatus] = useState("");
  const[isEdit,setIsEdit] = useState(false);
  const [postImg,setPostImg] = useState("");
  const[allStatus, setAllStatus] = useState([]);
  const [currentProfile,setCurrentProfile] = useState({});
  const [currentImg , setCurrentImg] = useState({});
  const [progress,setProgress] = useState(0);
  const [allusers,setAllUsers] = useState([]);
  const [currentPost , setCurrentPost] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  

    const getImg = (event)=>{
        setCurrentImg(event.target.files[0])
    }
    const uploadImg = ()=>{
        UploadImgApi(currentImg,currentUser.id,setAddPicModalPage,setProgress,setCurrentImg);
        
    }


    useEffect(() => {
      if (location?.state?.id) {
        getSingleStatus(setAllStatus, location?.state?.id);
      }
  
      if (location?.state?.email) {
        getSingleUser(setCurrentProfile, location?.state?.email);
      }
      
    }, [location]);

    const sendStatus =  async()=>{
    
      let object = {
        status:status,
        timeStamp:getCurrentTimeStamp('hour'),
        userEmail:currentUser.email,
        userName:currentUser.name,
        postId:GetUniqueId(),
        userId:currentUser.id,
        postImg:postImg,
      };
      
      
      await PostData(object);
      await setmodalOpen(false);
      setIsEdit(false);
      await setStatus("");
    }
  
  
    const getEditzData = (posts)=>{
      setmodalOpen(true);
      setStatus(posts?.status);
      setCurrentPost(posts)
      setIsEdit(true);
      
    };
  
    const updateStatus =  () => {
      setIsUpdating(true); 
      const updatedPostImg = postImg || currentPost.postImg;
    
      updatePost(currentPost.id, status, updatedPostImg);
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
    <Container>  
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
           isUpdating={isUpdating}
           />
    <AddCart>
        <UserInfo>
        <CardBackground>
        </CardBackground>
        
        <ProfileEdit modalOpen={modalOpenEd}
           setmodalOpen={setModelOpenEd} currentUser={currentUser}/>

         {currentUser.id === location?.state?.id ?
        <AddPicModal 
        setAddPicModalPage = {setAddPicModalPage} 
        addPicModalPage = {addPicModalPage} 
        currentImg = {currentImg}
        getImg = {getImg} 
        uploadImg = {uploadImg} 
        progress = {progress}
        /> :
        <Modal
                        centered
                        open={addPicModalPage}
                        onOk={() => setAddPicModalPage(false)}
                        onCancel={() => setAddPicModalPage(false)}
                        footer={[]}
                      >
                       
                        <OpenPic
                          onClick={() => setAddPicModalPage(true)}
                          src={ Object.values(currentProfile).length === 0
                            ? currentUser.imageLink
                            : currentProfile?.imageLink}
                          className="post-image modal"
                          alt="post-image"
                        />
                        
        </Modal>
         }
        
        
        <UserDiv>
          
        <div style={{display:"flex", justifyContent:"space-between",width:"100%"}}>       
            <Photo onClick={() => setAddPicModalPage(true)}>
                <img src={ Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink} alt="" />
            </Photo>   
            {currentUser.id === location?.state?.id ? (
            <Edit onClick={() => setModelOpenEd(true)}><MdOutlineEdit/></Edit>
            ) : 
            (<></>)}
        </div> 

        <div style={{display:"flex",flexWrap:"wrap" ,justifyContent:"space-between",width:"100%"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}> 

            <Link>{Object.values(currentProfile).length===0
            ?currentUser.name 
            : currentProfile?.name}</Link><span>{Object.values(currentProfile).length===0
            ?currentUser.pronouns
            :currentProfile?.pronouns}</span>
         </div>

         <div style={{fontSize:"14px", display:"flex" , flexDirection:"column",gap:"10px",textAlign:"start"}}>
         <span >{Object.values(currentProfile).length===0
         ?currentUser.collage
         :currentProfile?.collage}</span> <span>{Object.values(currentProfile).length===0
         ?currentUser.industry
         :currentProfile?.industry}</span>
         </div>   
         </div> 

         <p style={{width:"35%",wordWrap:" initial",fontSize:"16px",textAlign:"start"}}>
        {Object.values(currentProfile).length === 0
         ?currentUser.headline
         :currentProfile?.headline} 
         </p> 

         <p style={{color: "rgba(0,0,0,0.6)",fontSize:"14px", display:"flex" ,gap:"10px"}}>
         <span>{Object.values(currentProfile).length === 0
            ? currentUser.city 
            : currentProfile?.city  }
            </span>
            <span>
            {Object.values(currentProfile).length === 0
            ? currentUser.country 
            : currentProfile?.country }
            </span>
            </p>
       
        <div>
        {Object.values(currentProfile).length===0
         ?currentUser.skills
         :currentProfile?.skills}
        </div>
         
        </UserDiv>
        </UserInfo>

        
        <Item>
          
        <a href={Object.values(currentProfile).length===0
         ?currentUser.website
         :currentProfile?.website} >
        {Object.values(currentProfile).length===0
         ?currentUser.website
         :currentProfile?.website}
        </a>
        <div>
        {Object.values(currentProfile).length===0
         ?currentUser.aboutme
         :currentProfile?.aboutme}
        </div>
        </Item>
    </AddCart>



    {/* //filter the profile for their own post in profile */}
    
    <MyPosts style={{width:"95%"}}>
    {allStatus?.map((posts) => {
          return (
            <div key={posts.id}>
              <PostCard posts={posts} getEditzData={getEditzData} />
            </div>
          );
        })}
        
        
       </MyPosts>
    

    
</Container>
  )

}

export default ProfileCard

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    align-items: center;
    justify-content: center;

    @media (max-width:768px ){
        margin-bottom: 120px;
    }
    
    
 `

 const AddCart = styled.div`
    width: 600px;
    
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    transition: box-shadow 83ms;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 /15%),0 0 0  rgb(0 0 0 /20%);
    @media (max-width:768px ){
     width: 90vw;
     max-width: 600px;
     
   }


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
    height: 150px;
    margin: -12px -12px 0;
    cursor: pointer;
    
    
 `;

 const UserDiv = styled.div`
   display: flex;
   flex-direction: column;
   position:relative;
   align-items: start;
   margin-left: 5px;
   gap: 5px;
 `
  const Edit = styled.div`
    
    margin: 12px;
    cursor: pointer;
    font-size: 25px;
  `
 const Photo = styled.div`
 cursor: pointer;
    box-shadow: none;
    position: relative;
    background-image: url("/images/photo.svg");
    width: 120px;
    height: 120px;
    box-sizing: border-box;
    background-clip: content-box;
    background-color: #ffffff;
    background-position: center;
    background-size: 60%;
    background-repeat: no-repeat;
    border: 2px solid white;
    margin: -49px 5px 5px 0px;
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
   box-sizing: border-box;
    font-size: 25px;
    line-height: 1.5;
    color: rgba(0,0,0,0.9);
    font-weight: 600;
 `;

 

 const Item = styled.div`
        a{
            font-weight: 500;
            color: #053ec4;
            font-size: 15px;
        }
        display: flex;
        align-items: start;
        flex-direction: column;
        gap: 5px;
        padding:10px;
    
 `;


const MyPosts  = styled.div`
  max-width: 600px;
  @media (max-width:768px ){
     width: 90vw;
     
   }

`;

const OpenPic = styled.img`
  width: 100%;
  margin-top: 30px;
  object-fit: cover;

`