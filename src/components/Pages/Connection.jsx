import React, { useEffect ,useState,useMemo} from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import ConnectionC from '../ConnectionC';
import { getCurrenUser } from '../../api/FireStore';

const Connection = () => {
    let [loading,setLoading] = useState(true);
    const [currentUser,setCurrentUser] = useState({});


    const navigate = useNavigate();
    useEffect(()=>{
        onAuthStateChanged(auth,(res)=>{
            if(!res?.accessToken){
                navigate("/signin");
                navigate("/");
                console.log(res);
            }else {
                setLoading(false);
            }
        });
    },[]);
    
    useMemo(() => {
      getCurrenUser(setCurrentUser);
    }, []);

    

    return loading ? <Loader/> : <ConnectionC currentUser = {currentUser}/>
    
}

export default Connection
