import React, { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { onlogOut } from "../../../api/AuthApi";
import { getCurrenUser } from "../../../api/FireStore";
import Buttons from "../Button";
import styled from "styled-components";

export default function ProfilePopup({ allusers }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const profilePopupRef = useRef(null);

  useMemo(() => {
    getCurrenUser(setCurrentUser);
  }, []);

  // Function to handle click on document
  const handleClickOutside = (event) => {
    if (profilePopupRef.current && !profilePopupRef.current.contains(event.target)) {
      // Clicked outside the popup, close it
      navigate("/");
    }
  };

  // Attach event listener when the component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <PopUpCard ref={profilePopupRef}>
      <AboutU>
        <img
          src={
            allusers.filter((item) => item.id === currentUser.id).map((item) => item.imageLink)[0]
          }
          alt=""
        />
        <div>
          <h3>{currentUser.name}</h3>
          <p>{currentUser.headline}</p>
        </div>
      </AboutU>

      <Buttons
        title="View Profile"
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currentUser?.id,
              email: currentUser?.email,
            },
          })
        }
      />
      <Buttons title="Sign Out" onClick={onlogOut} />
    </PopUpCard>
  );
}

const PopUpCard = styled.div`
  border: 1px solid #a8a8a8;
  width: 250px;
  height: auto;
  background-color: whitesmoke;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  @media (max-width: 768px) {
    position: relative;
    top: -90px;
  }
`;

const AboutU = styled.div`
  display: flex;
  padding-bottom: 12px;
  margin-bottom: 10px;
  border-bottom: 1px solid #a8a8a8;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url("/images/user.svg");
    object-fit: cover;
  }
  p {
    font-size: 15px;
    opacity: 0.8;
  }
  gap: 5px;
  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;
