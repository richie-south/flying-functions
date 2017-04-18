import { get, post, doDelete, put } from '../http'

const baseUrl = 'https://richardsoderman.se/projectflying'
//const baseUrl = 'http://localhost:5001'
const webhook = 'webhook'

export const createWebhook = (id: string, url: string) =>
  post(`${baseUrl}/${webhook}/${id}`, {
    url,
  })

export const deleteWebhook = (id: string) =>
  doDelete(`${baseUrl}/${webhook}/${id}`)

export const viewWebhook = (id: string) =>
  get(`${baseUrl}/${webhook}/${id}`)

export const updateWebhook = (id: string, code: string) =>
  put(`${baseUrl}/${webhook}/${id}`, { id, code })