import axios from "axios";
const baseUrl = './api/persons'; //'http://localhost:3002/api/persons';
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  console.log('out they')
  return request
  .then((response) =>{
    console.log('here is the res')
    console.log(response)
    return response.data})
  .catch((err)=>{
  throw err;
    //console.log(err.response.data)
    //console.log(`this is the err ${err}`);
    });
};

const update = (id, updatedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(`fail`);
      throw error;
    });
};
const deleteItem = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};
export default {
  getAll,
  create,
  update,
  deleteItem,
};
