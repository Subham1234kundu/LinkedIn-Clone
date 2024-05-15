import GetUniqueId from "./components/common/GetUniqueId";
import { getCurrentTimeStamp } from "./components/common/LiveMoment";
import ModalComponent from "./components/common/Modal"

export const getEditzData = (posts)=>{
    const [modalOpen, setmodalOpen] = useState(false);
    const [status , setStatus] = useState("");

    const sendStatus =  async()=>{
    
        let object = {
          status:status,
          timeStamp:getCurrentTimeStamp('hour'),
          userEmail:currentUser.email,
          userName:currentUser.name,
          postId:GetUniqueId(),
          userId:currentUser.id,
          postImg:postImg,
        };
        
        
        await PostData(object);
        await setmodalOpen(false);
        setIsEdit(false);
        await setStatus("");
      }
 
        setmodalOpen(true);
        setStatus(posts?.status);
        setCurrentPost(posts)
        setIsEdit(true);
        
      
    
}