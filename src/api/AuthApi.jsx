
import {signInWithEmailAndPassword,createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,signOut} from 'firebase/auth';
import { auth} from '../firebase';




export const LoginAPI = (email,password) => {
  try{
    let responce = signInWithEmailAndPassword(auth,email,password);
    return responce;
  } catch(err){
    return err;
  }
};

export const RegisterAPI = (email,password) => {
    try{
      let responce = createUserWithEmailAndPassword(auth,email,password);
      return responce;
    } catch(err){
      return err;
    }
  };

  export const googleSignInAPI = async() => {
    try {
      let googleProvider = new GoogleAuthProvider();
      let res = await signInWithPopup(auth, googleProvider);
      return res;
    } catch (err) {
      return err;
    }
  };

  export const onlogOut = () => {
    try{
        signOut(auth);
    } catch(err){
      return err;
    }
  }



 


