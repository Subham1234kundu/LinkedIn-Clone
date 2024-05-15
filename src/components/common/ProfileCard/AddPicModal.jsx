import React from 'react'
import styled from 'styled-components'
import { Button, Progress, Modal } from 'antd'


const AddPicModal = ({setAddPicModalPage,addPicModalPage,currentImg,getImg,uploadImg,progress}) => {
  return (
    <>
      <Modal
      style={{top:-290,left:-2}}
      title="Add a Profile Image"
        width={800}
        height={60}
        centered
        open={addPicModalPage}
        onOk={() => setAddPicModalPage(false)}
        onCancel={() => setAddPicModalPage(false)}
        footer = {[
            
            <Button disabled={currentImg.name ? false : true} key="submit" type='primary' onClick={uploadImg}>Upload</Button>
        ]}
      >
        
        <ImgUpload>
        <p>{currentImg.name}</p>
        <label htmlFor="image-upload">Add an image</label>
        {progress === 0 ?
        (<></>):
        (<ProgressBar>
        <Progress type="circle" percent={progress} />
        </ProgressBar>)}
        
        <input hidden id='image-upload' type='file' onChange={getImg} />
        </ImgUpload>
      </Modal>
    </>
  )
}

export default AddPicModal;


const ImgUpload = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    flex-direction: column;
    
    label{
        border: 1px solid #212121;
        padding: 10px;
        cursor: pointer;

    }
`;

const ProgressBar = styled.div`
    padding: 15px;

`