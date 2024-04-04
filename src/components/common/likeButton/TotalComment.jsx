import React from 'react'
import styled from 'styled-components';

const TotalComment = ({commentCount}) => {

    return <Span >{commentCount}</Span>
  
}

export default TotalComment


const Span = styled.span`
    position:absolute;
     top:-45px;
     right:60px;

     
`