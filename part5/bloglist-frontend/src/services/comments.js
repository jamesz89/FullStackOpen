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

export default { getAll, setToken }