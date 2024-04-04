import styled from "styled-components"
import Main from './home slides/Main';
import Leftside from './home slides/Leftside';
import Rightside from './home slides/Rightside';
import { useState } from "react";


const HomeC = ({currentUser}) => {
    const [allImgOpen,setAllImgOpen] = useState(false);
    return (
        <Container>
            
            <Section>
                <h5>
                    <a>Hiring in a hurry? -</a>
                </h5>
                <p>Find talented pros in record time with upwork and keep business moving</p>
            </Section>
            <Layout>
                <Leftside currentUser={currentUser} allImgOpen={allImgOpen}  />
                <Main currentUser={currentUser} allImgOpen={allImgOpen} setAllImgOpen={setAllImgOpen}/>
                <Rightside currentUser={currentUser} allImgOpen={allImgOpen} />
            </Layout>
        </Container>
      )
}

export default HomeC

const Container = styled.div`
padding-top: 52px;
max-width: 100%;
`;

const Section = styled.section`
min-height: 50px;
padding: 16px 0;
box-sizing: content-box;
text-align: center;
text-decoration: underline;
display: flex;
justify-content: center;
h5{
    color: #0a66c2;
    font-size: 14px;
    a{
        font-weight: 700;
    }
}

p{
    font-size: 14px;
    color: #434649;
    font-weight: 600;

}

@media (max-width:768px ){
    flex-direction: column;
    padding: 0 5px;
}
`

const Layout = styled.div`
    display: grid;
    grid-template-areas: "leftside main rightside";
    grid-template-columns: minmax(0,5fr) minmax(0,12fr) minmax(300px ,7fr);
    column-gap: 25px;
    row-gap: 25px;
    /* grid-template-rows: auto; */
    margin: 25px 35px;

    @media(max-width: 768px){
        display: flex;
        flex-direction: column;
        padding: 0 5px;
        margin: 25px 0;

    }
`
