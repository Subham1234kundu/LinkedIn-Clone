import React from "react";
import styled from "styled-components";

export default function Buttons({ title, onClick }) {
  return (
    <Button className="common-btn" onClick={onClick}>
      {title}
    </Button>
  );
}

const Button = styled.button`
     width: 200px;
  height: 30px;
  background-color: whitesmoke;
  border: 1px solid #0266ca;
  color: #0266ca;
  border-radius: 30px;
  font-family: system-ui;
  font-weight: 600;
  font-size: 14px;
  margin: 7px 0;
  width: 100%;
  &:hover{
    background-color: rgb(230, 230, 230);
  border: 2px solid #015ebc;
  color: #015ebc;
  }
`