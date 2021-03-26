import axios from "axios"

const baseUrl = "http://localhost:3001/api/persons"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject, {
    headers: {
      "content-type": "application/json",
    },
  })
  return request.then((res) => {
    return res.data
  })
}

const deleteContact = (id) => {
  const request = axios.delete(baseUrl + `/${id}`)
  return request.then((res) => {
    return res.data
  })
}

const updateContact = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, deleteContact, updateContact }
