import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${id}/comments`
  const response = await axios.get(url, config)
  return response.data
}

const create = async (id, newComment) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${id}/comments`
  const response = await axios.post(url, newComment, config)
  return response.data
}

export default { getAll, setToken, create }