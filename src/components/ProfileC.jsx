import React, {useState,useMemo} from 'react'
import ProfileCard from './common/ProfileCard/index.jsx';


const ProfileComponent = ({currentUser}) => {
  
    
  return <ProfileCard currentUser ={currentUser}/>
   
}

export default ProfileComponent
