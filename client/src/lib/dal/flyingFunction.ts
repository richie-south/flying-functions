import { get, post, doDelete } from '../http'

//const baseUrl = 'https://richardsoderman.se/projectflying'
const baseUrl = 'http://localhost:5001'
const flying = 'flying'

export const createFlyingFunction = ({ code, name }) => 
  post(`${baseUrl}/${flying}`, {
    code, 
    name,
  })

export const deleteFlyingFunction = (id: string) => 
  doDelete(`${baseUrl}/${flying}/${id}`)

export const viewFlyingFunction = (id: string) => 
  get(`${baseUrl}/${flying}/${id}`)