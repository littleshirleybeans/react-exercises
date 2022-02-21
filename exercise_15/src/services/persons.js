import axios from "axios"

const baseUrl = '/api/persons'
// const baseUrl = 'https://fast-woodland-29273.herokuapp.com/api/persons'
// const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
  // request.then(response => console.log(response.data))  // you'll see '{}' in the coonsole, No data is sent with the request, so nothing is returned
}

const personService = {
  getAll,
  create,
  update,
  remove
}

export default personService