
import { storage } from '../lib/firebase';
import {ref,getDownloadURL,uploadBytesResumable} from 'firebase/storage';
import { editProfile } from './FireStore';


export const UploadImg = (file,id,setAddPicModalPage,setProgress,setCurrentImg)=>{
    const profilePicsRef = ref(storage, `profileImages/${file.name}`);
    const uploadTask = uploadBytesResumable(profilePicsRef ,file);

    uploadTask.on("state_changed" ,
    (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
  
        setProgress(progress);
      },(error)=>{
        console.error(error)
    },()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then((res)=>{
            editProfile(id,{imageLink:res});
            setAddPicModalPage(false);
            setCurrentImg({});
            setProgress(0);
            
        })
    }
    )
}


export const UploadPostImg = (file,setPostImg,setProgress)=>{
  const postPicsRef = ref(storage, `postImages/${file.name}`);
  const uploadTask = uploadBytesResumable(postPicsRef  ,file);

  uploadTask.on("state_changed" ,
  (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress)
      
    },(error)=>{
      console.error(error)
  },()=>{
      getDownloadURL(uploadTask.snapshot.ref)
      .then((res)=>{
        setPostImg(res);
          
      })
  }
  )
}