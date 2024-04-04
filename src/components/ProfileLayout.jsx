import React, {useState,useMemo} from 'react'
import Profile from './Pages/Profile';



const ProfileLayout = () => {
   
  return (
    <div>
      
      <Profile currentUser={currentUser}/>
    </div>
  )
}

export default ProfileLayout
