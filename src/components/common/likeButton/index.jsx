import  { useMemo, useState } from 'react'
import { likePost,getLikesByUser,postComment,getComments,getAllUsers } from '../../../api/FireStore';
import { AiFillLike,AiOutlineLike  } from "react-icons/ai";
import TotalLike from './TotalLike';
import TotalComment from './TotalComment';
import styled from 'styled-components';
import { getCurrentTimeStamp } from '../LiveMoment';
import { FiEdit } from "react-icons/fi";


const LikeButton = ({userId,postId,currentUser,getEditzData,posts}) => {
 const [likeCount , setLikeCount ] = useState(0);
 const [liked ,setLiked] = useState(false);
 const [showCommentBox,setShowCommentBox] = useState(false);
 const [comment,setComment] = useState("");
 const [comments,setComments] = useState([]);
 const [allusers,setAllUsers] = useState([]);
const[commentCount , setCommentCount] = useState(0);


    const handleLike = ()=>{
        likePost(userId,postId,liked);
    }

    const getComment = (event)=>{
        setComment(event.target.value);
    }
    
    const addComment = ()=>{
        postComment(postId,comment,getCurrentTimeStamp('hour'),currentUser?.name, currentUser?.imageLink);
        setComment("");
    }
    useMemo(()=>{
        getLikesByUser(userId,postId,setLikeCount,setLiked);
        getComments(postId , setComments,setCommentCount);
        
    },[userId,postId]);


    

    useMemo(()=>{
        getAllUsers(setAllUsers);
    },[])
    
  return (
    <ForClicking>
    <LikeBox style={{position:"relative"}}>
    
        <TotalLike likeCount={likeCount}/>
        <TotalComment commentCount={commentCount}/>

        <LikeEffect style={{display:"flex",alignItems:"center"}}  onClick={handleLike}>
     {liked ?( <AiFillLike color='#548ce8'size={20}/>):(<AiOutlineLike size={20} color='black'/>)}
       
       <span className={liked ? "blue"  : "black"}>Like</span>
     </LikeEffect>

     <CommentBox onClick={()=> setShowCommentBox(!showCommentBox)}>
     <img src="/images/comment-icon.svg" alt="" />
     <span>Comment</span>
     </CommentBox>
     



    {currentUser.id === posts.userId ? <ToEdit onClick={()=>getEditzData(posts)}>
            <FiEdit />
            <span>Edit</span>
    </ToEdit> : <></>}
   

    </LikeBox>

    

   {showCommentBox ?(
    <>

    <InnerCommentBox>
    <div style={{display:"flex" ,alignItems:"center",gap:"10px"}}>
    <img src={allusers.filter((item)=> item.id === currentUser.id).map((item)=> item.imageLink)[0]}  alt="" style={{borderRadius:"50%"}} />
    <input type="text" placeholder='Add a comment' onChange={getComment} name='comment' value={comment}/>
    </div>
    <button className={comment.length <= 1 ? "hide":"display"} onClick={addComment}>Post</button>
    </InnerCommentBox>


    {comments.length >0 ? (comments.map((comment)=> {
        return(
            <div key={comment.id} >
            <ShowComment>

                <div>
                <img src={comment.imageLink} alt="" style={{borderRadius:"50%"}} />
                </div>
                 
                <NameComment>
                <div style={{display:"flex" ,gap:"10px",alignItems:"center" }}>
                <h1>{comment.name}</h1>
                <h5>{comment.timeStamp}</h5>
                </div>
                <h5>{comment.headline ? comment.headline : ""}</h5>
                <p>{comment.comment}</p>
                
                </NameComment>
                
            </ShowComment>

            <LikeComment>
            <p >like</p> <p>|</p>
            <p>comment</p>
            </LikeComment>
            
            </div>
        )
    })):(<></>)}
    </>
   ):(<></>)}

   
    
    </ForClicking>
  );
  
  
}

export default LikeButton

const ForClicking = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    background-color: #ffff;
    justify-content: center;
    margin: 15px;
    
    input{
     width: 80% ;
     height: 40px;
     border-radius: 30px;
     border: 1px solid gray;
     padding-left: 15px;
     font-size: 14px;
     
    }
    input:focus{
        outline: 1px solid #b7bdc4;
     }

     button{
        margin-left:60px;
        background-color: #548ce8;
        color: white;
        font-weight: 500;
        width: 60px;
        border-radius: 30px;
        align-content: center;
        padding: 12px;
     }

     span{
        font-size: 12px;
     }
     
`

const LikeBox = styled.div`
   display: flex;
   align-items: center;
   gap:20px;
   cursor: pointer;
    
`
const LikeEffect = styled.div`
    
        .black{
            color: black;
        }
        .blue{
            color: #548ce8;
        }
    
`;

const CommentBox  = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
`;

const ShowComment = styled.div`
    margin-top: 10px;
    display: flex;
    gap: 10px;
    
    h1{
        font-size: 16px;
    }
    h5{
        font-size: 13px;
        font-weight: 300;
        color: gray;
    }

    p{
        margin-top: 14px;
        text-align: start;
    }
    div{
        img{
      object-fit: cover;
      background-image: url("/images/user.svg");
      height:40px; 
      width:40px;
    }
    }
    
`;

const InnerCommentBox =styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    .hide{
        display: none;
    }
    .display{
        display: initial;
    }

    img{
      object-fit: cover;
      background-image: url("/images/user.svg");
      height:45px; 
      width:45px;
    }
    input{
        width: 86%;
    }
`
const NameComment = styled.div`
    display: flex;
    flex-direction: column;
    
    align-items: start;
    justify-content: start;
    background-color: #f1f1f1;
    width: 86%;
    border-radius: 10px;
    padding: 10px;
    margin-left: 5px;
`;


const ToEdit = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LikeComment = styled.div`
    display: flex;
    align-items: flex-start;
    margin-left: 8%;
    margin-top: 4px;
    cursor: pointer;
    border-radius: 5%;
    p{
        font-size: 14px;
        color: #5a5a5a;
        padding: 3px;
        &:hover{
        background-color: #ededed;
        }
    }
`

