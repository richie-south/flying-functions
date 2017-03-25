import 'isomorphic-fetch'

const getHeaders = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
})

export const post = (url: string, body: object) => 
  fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body)
  })

export const get = (url: string) => 
  fetch(url)

export const doDelete = (url: string) => 
  fetch(url, {
    method: 'DELETE',
    headers: getHeaders(),
  })