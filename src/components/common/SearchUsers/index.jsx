import React from 'react'
import styled from 'styled-components'
const SearchUser = ({setSearchInput,searchInput}) => {
    
    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
          
          setSearchInput("");
        }
      };
      const handleInputChange = (event) => {
        setSearchInput(event.target.value);
        
      };
  return (
    
    <Search>
    <div>
    <input value={searchInput} onKeyDown={handleEnterKeyPress} type="text" placeholder='search by user' onChange={handleInputChange} />
    <SearchIcon>
    <img src="/images/search-icon.svg" alt="" />
    </SearchIcon>
    </div>
    </Search>
  )
}

export default SearchUser

const Search = styled.div`
    opacity: 1;
    flex-grow: 1;
    position: relative;
    & > div{
        max-width: 280px;
        input {
            border: none;
            box-shadow: none;
    background-color: #eef3f8;
    border-radius: 2px;
    color: rgba(0,0,0,0.9);
    width: 218px;
    padding: 0 8px 0 40px;
    line-height: 1.75;
    font-size: 400;
    font-size: 14px;
    height: 34px;
    border-color: #dce6f1;
    vertical-align: text-top;
    
        }
    }
`;

const SearchIcon = styled.div`
        width: 40px;
        position: absolute;
        z-index: 1;
        top: 10px;
        left: 2px;
        border-radius: 0 20px 20px 0;
        margin: 0;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;

`;