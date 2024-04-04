import moment from "moment/moment";

export const getCurrentTimeStamp = (currTime)=>{
    return moment().startOf(currTime).fromNow();;
}

