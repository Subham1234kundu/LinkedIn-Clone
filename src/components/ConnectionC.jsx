import { useEffect, useMemo, useState } from "react"
import { getAllUsers, addConnection,getConnection } from "../api/FireStore"
import styled from "styled-components"
import ConnectedUsers from "./common/ConnectedUsers/index.jsx"


const ConnectionC = ({currentUser}) => {
    const [users,setUsers] = useState([]);
    
    
    const getCurrUser = (id)=>{
        
        addConnection(currentUser.id,id)
    };

    useEffect(()=>{
        getAllUsers(setUsers)
    },[]);

    


  

    return (
        <ConnectionPage>
          {users.map((user) =>
            user.id !== currentUser.id ? (
              <ConnectedUsers
                key={user.id} 
                currentUser={currentUser}
                user={user}
                getCurrUser={getCurrUser}
              />
            ) : null
          )}
        </ConnectionPage>
      );
    };

export default ConnectionC


const ConnectionPage = styled.div`
    padding-top: 72px;
    max-width: 100%;
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    @media(max-width: 768px){
        grid-template-columns: auto auto;
    }
    
`