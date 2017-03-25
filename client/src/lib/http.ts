import 'isomorphic-fetch'

const getHeaders = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
})

export const post = (url, body) => 
  fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body)
  })

export const get = (url) => 
  fetch(url)

export const doDelete = (url) => 
  fetch(url, {
    method: 'DELETE',
    headers: getHeaders(),
  })