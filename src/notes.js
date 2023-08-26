import axios from "axios"

const baseUrl = "http://localhost:3001/notes"
const getAll = () => {
    return axios.get(baseUrl)
};

const create = (note) => {
    return  axios.post(baseUrl, note)
};


const update = (id, updatedNote) => {
    return axios.put(`${baseUrl}/${id}`,updatedNote)

}
export default {getAll, create, update}