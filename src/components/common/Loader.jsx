
import "./Loader.css"

import styled from 'styled-components';
const Loader = () => {
  return (
    <Body>
        
    
    <FlexCol>
      
      
      <img src="/images/login-logo.svg" alt="" />
      <div className="loader"></div>
      </FlexCol>
    
  
  </Body>
  )
}

export default Loader

const Body = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    img{
        
    }
`
const FlexCol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`
