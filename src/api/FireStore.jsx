import { firestore} from '../firebase';
import {addDoc,collection,onSnapshot,doc,updateDoc,query,where,setDoc,deleteDoc,getDocs} from "firebase/firestore";
import {toast} from "react-toastify";


let postsRef = collection(firestore,"posts");
let userRef = collection(firestore,"users");
let likeRef = collection(firestore,"likes");
let commentRef = collection(firestore,"comments");
let connectionRef = collection(firestore, "connections");
let commentLikeRef = collection(firestore, "likeComment");

export const PostData = (object) => {
  addDoc(postsRef,object)
  .then(()=>{
    toast.success("post has been added succesfully")
  })
  .catch((err)=>{
    console.log(err)
  })
};

export const getStatus = (setAllStatus)=>{
  onSnapshot(postsRef,(responce)=>{
    setAllStatus(responce.docs.map((doc)=>{
      return {...doc.data(), id:doc.id};
    }));
  })
};

export const getAllUsers = (setAllUsers)=>{
  onSnapshot(userRef,(responce)=>{
    setAllUsers(responce.docs.map((doc)=>{
      return {...doc.data(), id:doc.id};
    }));
  })
}

export const postUsersData = (object)=>{
  addDoc(userRef,object)
    .then(()=>{})
    .catch((err)=>{
      console.log(err);
    })
};

export const getCurrenUser = (setCurrentUser)=>{
  
  onSnapshot(userRef,(responce)=>{
    setCurrentUser(responce.docs.map((doc)=>{
      return {...doc.data(), id:doc.id};
    })
    .filter((item)=>{
      return item.email === localStorage.getItem("userEmail");
    })[0]
    )
    
  })
};

export const editProfile = (userId ,payload)=>{
    let userToEdit = doc(userRef, userId);

    updateDoc(userToEdit,payload)
    .then(()=>{
      toast.success("profile has been updated");
    })
    .catch((err)=>{
      console.log(err);
    })

};



export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(postsRef, where("userId", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getSingleUser = (setCurrentUser, email) => {
  const singleUserQuery = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};

export const likePost = (userId,postId,liked)=>{
 try{
  let docToLike = doc(likeRef,`${userId}_${postId}`);
  if(liked){
    deleteDoc(docToLike)
  }else{
    setDoc(docToLike , {userId,postId});
  }
 }
 catch(err){
  console.log(err)
 }
}




export const getLikesByUser = (userId,postId,setLikeCount,setLiked)=>{
  try{
    let likeQuery = query(likeRef,where("postId" ,"==", postId));
    onSnapshot(likeQuery,(res)=>{
      let likes = res.docs.map((doc) => doc.data());
      let likesCount = likes?.length;

      const isLiked = likes.some((like) => like.userId === userId);
        setLikeCount(likesCount);
        setLiked(isLiked)
    })

  }
  catch(err){
    console.log(err)
   }
}



export const postComment = (postId,comment,timeStamp,name,imageLink)=>{
  try{
    addDoc(commentRef,{
      postId,comment,timeStamp,name,imageLink
    })
  }
  catch(err){
    console.log(err)
   }
};

export const getComments = (postId,setComments,setCommentCount) =>{
  try{
    let singlePostQuery = query(commentRef,where("postId","==",postId));
    onSnapshot(singlePostQuery , (res)=>{
      const comments = res.docs.map((doc)=>{
        return {
          id:doc.id,
          ...doc.data()
        }
      });
      let commentCount = comments?.length;
      setCommentCount(commentCount);
      setComments(comments);
    })
  }
  catch(err){
    console.log(err)
   }
};

export const updatePost = (id,status,postImg)=>{
  let docToUpdate =  doc(postsRef ,id);
  
  try{
    updateDoc(docToUpdate,{status,postImg});
    toast.success("post has been updated")

  }catch(err){
      console.log(err)
  }
}

export const deletePost = (id) => {
  let docToDelete = doc(postsRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success("Post has been Deleted!");
  } catch (err) {
    console.log(err);
  }
};



export const addConnection = (userId,targetId)=>{
  try{
   let connectionToAdd = doc(connectionRef,`${userId}_${targetId}`);
   
     setDoc(connectionToAdd , {userId,targetId});
     toast.success("connection added");
     
  }
  catch(err){
   console.log(err)
  }
 };



 export const getConnection = (userId, targetId, setIsConnected) => {
  try {
    let connectionsQuery = query(
      connectionRef,
      where("targetId", "==", targetId)
    );

    onSnapshot(connectionsQuery, (response) => {
      let connections = response.docs.map((doc) => doc.data());

      const isConnected = connections.some(
        (connection) => connection.userId === userId
      );

      setIsConnected(isConnected);
    });
  } catch (err) {
    console.log(err);
  }
};


