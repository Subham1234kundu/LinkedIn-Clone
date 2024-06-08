import { useEffect, useState } from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { getCurrenUser} from '../api/FireStore';
import ProfilePopup from './common/profilePopup';
import { getAllUsers } from '../api/FireStore';
import SearchUser from './common/SearchUsers';


const Header = () => {
    let navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [popupVisible, setPopupVisible] = useState(false);
    const [isActive ,setIsActive] = useState(0);
    const [allusers,setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchInput , setSearchInput] = useState("");
    
    const openUser = (user)=>{
        navigate("/profile" , {
            state:{id:user.id,email:user.email}
        })
        setSearchInput("");
    }


    const handleSearch = () => {
        if (searchInput !== "") {
          let searched = allusers.filter((user) => {
            return Object.values(user)
              .join("")
              .toLowerCase()
              .includes(searchInput.toLowerCase());
          });
    
          setFilteredUsers(searched);
        } else {
          setFilteredUsers(allusers);
        }
      };
    
      useEffect(() => {
        let debounced = setTimeout(() => {
          handleSearch();
        }, 800);
    
        return () => clearTimeout(debounced);
      }, [searchInput]);
    
    

      useEffect(()=>{
        getCurrenUser(setCurrentUser);
        getAllUsers(setAllUsers);
    },[])
    
    const displayPopup = () => {
        setPopupVisible(!popupVisible);
      };
    const unserLineActive = (index)=>{
        setIsActive(index === isActive ? null : index)
    };

    const navigateAndUpdate = (index, path) => {
        unserLineActive(index);
        navigate(path);
    };
    
    useEffect(() => {
        // When the component mounts, check if there is a stored active index
        const storedIndex = localStorage.getItem('activeIndex');
        if (storedIndex) {
            setIsActive(parseInt(storedIndex, 10));
        }
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Function to update active index and store it in localStorage
    const updateActiveIndex = (index) => {
        setIsActive(index);
        localStorage.setItem('activeIndex', index);
    };

    useEffect(() => {
        // Remove active class when navigating to "/profile"
        if (location.pathname === "/profile" ) {
          setIsActive(null);
          setPopupVisible(false);
        }
      }, [location.pathname]);
    
  return (
    <Container>
        {
            popupVisible ? (
                <PopUpPosition>
                    <ProfilePopup allusers={allusers}/>
                </PopUpPosition>
            ):(
                <></>
            )
        }
        <Content>
            <Logo>
                <a href="/home">
                    <img src="/images/home-logo.svg" alt="" />
                </a>
            </Logo>
             <SearchUser setSearchInput ={setSearchInput}  searchInput={searchInput}/>
             {searchInput.length === 0 ? 
             (<></>):
              (<SearchReasult>
             {filteredUsers.length === 0 ? (<div>no user found...</div>):
             filteredUsers.map((user) =>(
                <div onClick={()=>openUser(user)}>
                    <img src={user.imageLink} alt="" />
                    <p>{user.name}</p>
                </div>
             ))}
                
                </SearchReasult>)}
 


            <Nav>
                <NavListWrap>
                    <NavList className={isActive === 0 ? 'active' : ''} onClick={() => updateActiveIndex(0)}>
                        <a onClick={() => navigateAndUpdate(0, "/home")}>
                            <img style={{ opacity: "0.6" }} src="/images/nav-home.svg" alt="" />
                            <span>Home</span>
                        </a>
                    </NavList>

                    <NavList className={isActive === 1 ? 'active' : ''} onClick={() => updateActiveIndex(1)}>
                        <a onClick={() => navigateAndUpdate(1, "/connections")}>
                            <img src="/images/nav-network.svg" alt="" />
                            <span>My Network</span>
                        </a>
                    </NavList>

                    <NavList className={isActive === 2 ? 'active' : ''}
                             onClick={() => unserLineActive(2)}>
                        <a >
                            <img src="/images/nav-jobs.svg" alt="" />
                            <span>Jobs</span>
                        </a>
                    </NavList>

                    <NavList className={isActive === 3 ? 'active' : ''}
                             onClick={() => unserLineActive(3)}>
                        <a >
                            <img src="/images/nav-messaging.svg" alt="" />
                            <span>Messaging</span>
                        </a>
                    </NavList>

                    <NavList className={isActive === 4 ? 'active' : ''}
                             onClick={() => unserLineActive(4)}>
                        <a >
                            <img src="/images/nav-notifications.svg" alt="" />
                            <span>Notifications</span>
                        </a>
                    </NavList>

                    <User onClick={displayPopup}>
                        <a >
                        <img src={allusers.filter((item)=> item.id === currentUser.id).map((item)=> item.imageLink)[0]} alt="" />
                        <span>Me</span>
                        
                        </a>

                       
                    </User>

                    

                    
                </NavListWrap>
            </Nav>
        </Content>
    </Container>
  )
}

export default Header;


const Container = styled.div`
    background-color: white;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    left: 0;
    padding: 0 24px;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 100;
    @media (max-width: 768px) {
    height: 40px;
  }
`;

const Content = styled.div `
    display: flex;
    align-items: center;
    margin: 0 auto;
    min-height: 100%;
    max-width: 1128px;
    position: relative;

`;

const Logo = styled.span`
    margin-right: 8px;
    font-size: 0px;
`;


const Nav = styled.nav`
    margin-left: auto;
    display: block;
    @media (max-width:768px){
        position: fixed;
        display: flex;
        left: 0;
        bottom: 0;
        background: white;
        width: 100%;
    }
`;

const NavListWrap = styled.ul`
    display: flex;
    flex-wrap: nowrap;
    list-style-type: none;
    @media (max-width:768px){
            overflow-y: auto;
            gap: 5px;
        }

    .active{
        span:after{
            content: "";
        transform: scaleX(1);
        border-bottom: 2px solid var(--white,#fff);
        bottom: 0;
        left: 0;
        position: absolute;
        transition: trasform 0.2s ease-in-out;
        width: 100%;
        border-color: rgba(0,0,0,0.9);
        
        }
    
    }
`;   

const NavList = styled.li`
    display: flex;
    align-items: center;
    
    a{
        align-items: center;
        background: transparent;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        font-weight: 400;
        justify-content: center;
        line-height: 1.5;
        min-height: 52px;
        min-width: 80px;
        position: relative;
        text-decoration: none;
        
        span{
            color: rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            
        }
        

        @media (max-width:768px){
            min-width: 70px;
        }
    }

    &:hover,&:active{
        a{
            span{
                color: rgba(0,0,0,0.9);
            }
        }
    }
`;


const User = styled(NavList)`
    object-fit: cover;
    a{
        img{
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-image: url("/images/user.svg");
        object-fit: cover;
    }
    }
     
    span{
        align-items: center;
    }
    
    
    
`;


const PopUpPosition = styled.div`
  position: absolute;
  right: 165px;
  top: 65px;
  z-index: 102;
  @media (min-width:1768px){
        right: 370px;
        }
        @media (max-width:768px){
            top: 75vh;
            right: 15vw;
        }
    
`;

const SearchReasult = styled.div`
    background-color: #fff;
    width: 60%;
    height: 248px;
    position: absolute;
    z-index: 10;
    top:50px;
    font-size: 400;
    font-size: 14px;
    left: 40px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    gap: 0px;
    box-shadow: 0 0 0 1px rgb(0 0 0 /18%),0 0 0  rgb(0 0 0 /20%);
    @media (max-width:768px){
        width: 260px;
        top:42px;
    }
    &::-webkit-scrollbar {
        width: 5px;
        
    }
    
    div{
        display: flex;
        gap: 10px;
        align-items: center;
        cursor: pointer;
        padding: 10px;
        &:hover{
            background-color: #d9d9d9c0;
        }
    }
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-image: url("/images/user.svg");
        object-fit: cover;
    }
    p{
        font-size: 14px;
        font-weight: 500;
    }
   

    
`

