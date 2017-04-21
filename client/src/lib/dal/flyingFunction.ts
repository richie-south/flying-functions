import { get, post, doDelete, put } from '../http'

const baseUrl = 'https://richardsoderman.se/projectflying'
//const baseUrl = 'http://localhost:5001'
const flying = 'flying'

export const createFlyingFunction = ({ code, name, HTTPType }) =>
  post(`${baseUrl}/${flying}`, {
    code,
    name,
    HTTPType,
  })

export const deleteFlyingFunction = (id: string) =>
  doDelete(`${baseUrl}/${flying}/${id}`)

export const viewFlyingFunction = (id: string) =>
  get(`${baseUrl}/${flying}/${id}`)

export const updateFlyingFunction = (id: string, code: string) =>
  put(`${baseUrl}/${flying}/${id}`, { id, code })