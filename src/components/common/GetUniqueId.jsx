import {v4 as uuid} from "uuid"

const GetUniqueId = () => {
  let id = uuid();
  return id;
}

export default GetUniqueId
