import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async(newObject) => {
  const url = `${baseUrl}/${newObject.id}`
  const response = await axios.put(url, newObject)
  return response.data
}

export default { getAll, create, update }