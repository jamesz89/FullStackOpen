import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const remove = id => {
    const newBaseUrl = `${baseUrl}/${id}`
    const request = axios.delete(newBaseUrl)
    return request.then(response => response.data)
}

const update = (id, value) => {
    const newBaseUrl = `${baseUrl}/${id}`
    const request = axios.put(newBaseUrl, value)
    return request.then(response => response.data)
}

const personServices = { getAll, create, remove, update }

export default personServices