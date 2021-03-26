import axios from "axios"

const baseUrl = "https://fierce-badlands-58853.herokuapp.com/api/persons"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request
    .then((response) => response.data)
    .catch((err) => console.log(err))
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request
    .then((res) => {
      return res.data
    })
    .catch((err) => console.log(err))
}

const deleteContact = (id) => {
  const request = axios.delete(baseUrl + `/${id}`)
  return request
    .then((res) => {
      return res.data
    })
    .catch((err) => console.log(err))
}

const updateContact = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

export default { getAll, create, deleteContact, updateContact }
