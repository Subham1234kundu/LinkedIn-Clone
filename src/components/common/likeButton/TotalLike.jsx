
import styled from 'styled-components';


const TotalLike = ({likeCount}) => {
    
    
  return <Span >{likeCount}</Span>
    
}

export default TotalLike

const Span = styled.span`
    position:absolute;
     top:-43px;
     left:24px;

     
`