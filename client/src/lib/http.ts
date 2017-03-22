import 'isomorphic-fetch'

const sendFlyingFunctionUrl = 'https://richardsoderman.se/projectflying/flying'

const getBody = (code, name) => {
  return JSON.stringify({
    name,
    code,
  })
}

export const postFlyingFunction = ({ code, name }) =>
  fetch(sendFlyingFunctionUrl, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
    body: getBody(code, name),
  })