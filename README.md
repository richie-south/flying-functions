# flying-functions  
Your functions in the cloud with rest api  

<img src="https://raw.githubusercontent.com/richie-south/flying-functions/master/ff.png" width="200">  

# TODO

## doc  

- Update api doc
- Add webhook api doc

## client
- Remake client with react-router
- CRUD flying function
  - ~~view~~
  - ~~create~~
  - ~~update~~
  - ~~delete~~
- CRUD webhook
  - view 
  - create
  - update
  - delete


## server  
- Add public random id, keep mongoose id secret
- Add webhook for function invocations - started
- ~~Re-implement string evaluation~~
- Add more globals 
  - firebase?
- ~~Use webhooks~~
- Add some auth and private functions - removing auth and doing secred id's inseed
  - ~~delete~~
  - update
- Use express pipes
- Update api structure
- ~~async stored function invocations~~
- ~~Look at solution for persistence storage with flying functions~~

# How to

**Function**  
write your function like this.
```javascript
/*
 * Function can be async if you want
 * @param data [express req.query or express req.data]
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

**GET - /flying/:id**  
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
  "self": "URL TO SELF",
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
  "self": "URL TO SELF",
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

**PUT - /flying/:id**  
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