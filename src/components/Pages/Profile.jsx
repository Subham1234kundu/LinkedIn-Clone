import React, { useEffect ,useState,useMemo} from 'react'
import ProfileComponent from '../ProfileC';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import { getCurrenUser } from '../../api/FireStore';

const Profile = () => {
  let [loading,setLoading] = useState(true);
  const [currentUser,setCurrentUser] = useState({});
  useMemo(()=>{
      getCurrenUser(setCurrentUser)
    },[]);
  const navigate = useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth,(res)=>{
        if(!res?.accessToken){
            navigate("/signin");
            navigate("/");
        }else {
            setLoading(false);
        }
    });
},[]);
  return loading ? <Loader/> : <ProfileComponent currentUser = {currentUser}/>
  
}

export default Profile
