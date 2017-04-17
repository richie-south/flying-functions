# flying-functions  
Your functions in the cloud with rest api  

<img src="https://raw.githubusercontent.com/richie-south/flying-functions/master/ff.png" width="200">  

# TODO

## doc  
- Update Persistent Storage doc

## client
- Validation messages
- Add button to show available globals and examples 
- Add dropdown for GET or POST 


## server  
- Add more globals
- Add better api error messages
- Add option for GET or POST
- Add github login to save flying-functions and webhooks under user id?

# How to

**Function**  
write your function like this.
```javascript
/*
 * @param data [express req.query (GET) or express req.data (POST)]
 * @param currentInvocation [nr of times function has been invocated]
 * @param flyingId [uniq id for flying function, same as uniq id in url]
 */
module.exports = async (data, currentInvocation, flyingId) => {
  // your code here
  return 10;
};
```
post it to flying functions like example in API bellow.


**Resppnse**  
Response from server executing function above.
```json
{
  "result": 10,
  "invocations": 1,
  "self": "URL TO SELF" 
}
```

# Globals
accessible from your flying function  

- console
- Number
- Math
- Promise
- setTimeout
- fetch | `isomorphic-fetch` from npm
- flyingStorageHandler | Persistent storage handler

# Persistent Storage
use the global `flyingStorageHandler` to save/update/view/remove data 

**flyingStorageHandler functions**  
- name: create
  - param: collectionId
  - param: data
  - returns: object
- name: getById
  - param: id
  - returns: object
- name: getByCollectionId
  - param: collectionId
  - returns: array
- name: updateDataById
  - param: id
  - param data
  - returns: object
- name: remove
  - param: id
  - returns: object

**example**

```javascript
module.exports = async (data currentInvocation, flyingId) => {
  // all your saved data will be stored with an collection id 
  // so you can retrive all data within an collection
  const collectionId = flyingId

  // data to store has to be object
  const dataToStore = {
    value: 10,
  };

  const storedData = await flyingStorageHandler.create(collectionId, dataToStore)
  const storedData2 = await flyingStorageHandler.create(collectionId, { value: 11 })
  // returns storedData object, _id, collectionId, timestamps
  await flyingStorageHandler.getById(storedData._id)
  // returns array of all stored objects on collectionId
  await flyingStorageHandler.getByCollectionId(collectionId) 

  return storedData
};
```


# API

## flying functions

**GET - /flying/**  
*view all stored functions - dev only*  
Responce: 
```json
[
  "ARRY WITH OBJECTS JUST LIKE (GET - /flying/:id)"
]
```

**GET - /flying/:secretId**  
*info about flying function*  
Responce:
```json
{
  "_id": "ID OF FLYING FUNCTION",
  "secretId": "SECRET ID TO REMOVE/UPDATE/VIEW",
  "name": "NAME OF FLYING FUNCTION",
  "code": "CODE FOR FLYING FUNCTION",
  "invocations": "NUMBER OF INVOCATIONS FOR FLYING FUNCTION",
  "createdAt": "TIME OF CREATION",
  "updatedAt": "TIME OF LATEST UPDATE",
  "invocationUrl": "URL TO INVOC FLYING FUNCTION",
  "self": "URL TO SELF"
}
```

**GET - /flying/:urlId/:name**  
*invoc flying function*  
Send flying functions params in query  
Responce:
```json
{
  "result": "RESULT FROM FLYING FUNCTION",
  "invocations": "NUMBER OF INVOCATIONS FOR FLYING FUNCTION",
  "self": "URL TO SELF"
}
```

**POST - /flying/:urlId/:name**  
*invoc flying function*  
Send flying functions params in body  
Responce:
```json
{
  "result": "RESULT FROM FLYING FUNCTION",
  "invocations": "NUMBER OF INVOCATIONS OF FLYING FUNCTION",
  "self": "URL TO SELF"
}
```

**POST - /flying/**  
*creates a new flying function*  
Send json object to create flying function  
```json
{
  "name": "YOUR FLYING FUNCTION NAME",
  "code": "CODE FOR FLYING FUNCTION"
}
```  
Responce:  
```json
{
  "invocationUrl": "URL TO INVOC FLYING FUNCTION",
  "urlId": "ID ONLY USED TO INVOC FLYING FUNCTION",
  "secretId": "SECRET ID TO REMOVE/UPDATE/VIEW",
  "name": "NAME OF FLYING FUNCTION"
}
```

**PUT - /flying/:secretId**  
*updates a flying function*  
Send json object to update flying function  
```json
{
  "code": "CODE FOR FLYING FUNCTION"
}
```  
Responce:  
```json
{
  "message": "Flying function updated"
}
```

**DELETE - /flying/:id**  
*removes flying function*  

Responce:  
```json
{
  "message": "Flying function removed"
}
```

## Webhook

**POST - /webhook/:urlId**  
*creates a new webhook*  
Send json object to create webhook  
```json
{
  "url": "WEBHOOK URL"
}
```  
Responce:  
```json
{
  "url": "WEBHOOK URL",
  "id": "ID OF WEBHOOK",
}
```
**DELETE - /webhook/:id**  
*removes webhook*  

Responce:  
```json
{
  "message": "webhook removed!"
}