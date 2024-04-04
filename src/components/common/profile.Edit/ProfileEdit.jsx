
import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Modal } from 'antd'
import { editProfile } from '../../../api/FireStore';
import Select from 'react-select';



const ProfileEdit = ({modalOpen,setmodalOpen,currentUser}) => {
    const [editInput , setEditInput] = useState(currentUser);
    const [value, setValue] = useState({});
    const [selectedValue, setSelectedValue] = useState(value);

    const getInput = (event)=>{
        let {name,value} = event.target;
        let input = {[name]:value}
        setEditInput({...editInput ,...input});
    }
    
    const updateProfileData = async ()=>{
        await editProfile(currentUser?.id ,editInput);
        await setmodalOpen(false);
        
    }

    const opctions = [
        {value:"Please Select" ,label:"Please Select",name:"Please Select"},
        {value:"She/Her" ,label:"She/Her",name:"She/Her"},
        {value:"He/Him" ,label:"He/Him",name:"He/Him"},
        {value:"They/Them" ,label:"They/Them",name:"They/Them"},
        {value:"custom" ,label:"custom",name:"custom"}

    ]

return (
    <>
      <Modal
       
        width={750}
        height={800}
        centered
        open={modalOpen}
        onOk={() => setmodalOpen(false)}
        onCancel={() => setmodalOpen(false)}
        footer = {[
            <Button key="submit" type='primary' onClick={updateProfileData}  >
                Save
            </Button>
            
        ]}
      >
             <MiddleCard>
     <EditCard>
         <EditNav>
         <h2>Edit intro</h2>
        
         </EditNav>
         <InputCard>
             <li>
             <p>name*</p>
             <input type="text" placeholder='name'
            onChange={getInput}  
            name='name' value={editInput.name}/>
            </li>

            <li>
            <p>Headline*</p>
            <input type="text" placeholder='Headline'
            onChange={getInput}
            name='headline' value={editInput.headline}/>
            </li>
                
            <li>
            <Select options={opctions} defaultValue={value} placeholder="please select"onChange={(selectedOption) => {
                    setValue(selectedOption);
                    getInput({
                      target: {
                        name: "pronouns",
                        value: selectedOption.value
                      }
                    })}}/>
                     
            </li>            

            <li>
                <h1>Education</h1>
            <p>Collage*</p>
            <input type="text" placeholder='collage'
            onChange={getInput}  value={editInput.collage}
            name='collage'/>
            </li>

            <li>
                <p>Industry* </p>
                <input type="text" placeholder='Ex:Retail' 
                value={editInput.industry} 
                onChange={getInput}
                name='industry'/>
            </li>


            <li>
                <h1>Location</h1>
            <p>country/Region*</p>
            <input type="text" placeholder='country'
            onChange={getInput}
            name='country'  value={editInput.country}/>
            </li>

            <li>    
            <p>City*</p>
            <input type="text" placeholder='City'
            onChange={getInput}  value={editInput.city}
            name='city'/>
            </li>
            
            <li>    
            <p>website*</p>
            <input placeholder='my website'
            onChange={getInput} value={editInput.website}
            name='website'/>
            </li>


            <li>
            <p>About*</p>
            <textarea type="text" placeholder='About me'
            onChange={getInput}
            rows={5} 
            name='aboutme' value={editInput.aboutme} />
            </li>

            <li>    
            <p>Skills*</p>
            <input placeholder='my skills'
            onChange={getInput}
            name='skills' value={editInput.skills}/>
            </li>


            

        </InputCard>
    </EditCard>
    </MiddleCard>
        
      </Modal>
    </>
  );


}

export default ProfileEdit

const MiddleCard = styled.div`
display: flex;
align-items: center;
justify-content: center;

`

const EditCard = styled.div`
     width: 600px;
     height: 100vh;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    padding: 20px;
   
`;

const EditNav = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 20px;
`;

const InputCard = styled.ul`
   list-style: none;
   display: grid;
   gap: 20px;
   margin-top: 40px;

   p{
    font-size:12px;
    color: #686767;
   }

   input,textarea{
    width: 100%;
    height: 28px;
        font-size :14px ;
        outline:1 px solid black;
        border: 1px solid #212121;
        box-shadow: inset 0 0 0 1px rgba(0 0 0 /60%),
              inset 0 0 0 2px rgba(0 0 0 /0%),
              inset 0 0 0 1px rgba(0 0 0 /0),;
        border-radius: 4px;
        padding: 5px;
   }
   textarea{
    height: 65px;
    resize: none;
   }
   
   h1{
        font-size: large;
   }
`;


