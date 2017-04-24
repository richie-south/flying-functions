# flying-functions  
Your functions in the cloud with rest api  

<img src="https://raw.githubusercontent.com/richie-south/flying-functions/master/ff.png" width="200">  

# Usage  

## Summary  

* [Basic how to](#basic-how-to)
* [Flying function params](#flying-function-params)
* [Globals](#globals)
* [Persistent Storage](#persistent-storage)
* [Api](#api)
* [Flying function Api](#flying-functions-api)
* [Webhook Api](#webhook-api)
* [Todo](#todo)


# Basic how to

 1. write your function like this.
```javascript
module.exports = async (data) => {
  // your code here 

  // example
  return 10; 
};
```
 2. post it to flying functions like example in API bellow.
 3. execute url from response.
 4. Response from server executing function above.
```json 
{
  "result": 10,
  "invocations": 1,
  "self": "URL TO SELF" 
}
```

# Flying function params

### Syntax  

```javascript
module.exports = async (data) => {}
```

### Parameters

  - data
    - express req.query (GET) or express req.data (POST)

# Globals  

these globals are accessible from your flying function  

- console
- Number
- Math
- Promise
- setTimeout
- fetch 
  - `isomorphic-fetch` from npm
- storageHandler
  - Persistent storage handler
- _requestOrigin 
  - What origin is the request from
- _flyingFunctionData
  - Object with data about your flying function, contains:
    - name.
    - urlId
    - secretId
    - invocations:
      - nr of times function has been invocated (including current)
    - HTTPType

# Persistent Storage

use the global `storageHandler` to manipulate data  

## Overview

* [create](#create)
* [getById](#getbyid)
* [getByCollectionId](#getbycollectionid)
* [updateDataById](#updatedatabyid)
* [remove](#remove)
* [example](#example)

## create  

### Syntax  

```javascript
const result = await storageHandler.create(collectionId, dataToStore)
```

### Parameters

- collectionId: string
  - used to store your data under a shared id so you can retirve large collections of that data.
- dataToStore: object
  - the data you want to store.  

### Return value

Object stored in the database

## getById  

### Syntax  

```javascript
const result = await storageHandler.getById(id)
```

### Parameters

- id: string
  - Id for specific resource.  

### Return value

Object stored in the database

## getByCollectionId

### Syntax  

```javascript
const result = await storageHandler.getByCollectionId(id)
```

### Parameters

- id: string
  - Id of a collection id.  

### Return value

An Array of multible objects that are stored under the same collection id.

## updateDataById

### Syntax  

```javascript
const result = await storageHandler.updateDataById(id, data)
```

### Parameters

- id: string
  - Id of a specific resource.  
- data: object
  - object of data to be uppdated.

### Return value

Updated object that is stored in the database.

## remove

### Syntax  

```javascript
const result = await storageHandler.remove(id)
```

### Parameters

- id: string
  - Id of a specific resource

### Return value

Object confirming the removal.


## example

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

## flying functions api

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
  "HTTPType": "HTTP REQUEST TYPE FOR YOUR FLYING FUNCTION", 
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
  "code": "CODE FOR FLYING FUNCTION",
  "HTTPType":  "HTTP REQUEST TYPE FOR YOUR FLYING FUNCTION"
}
```  
Responce:  
```json
{
  "invocationUrl": "URL TO INVOC FLYING FUNCTION",
  "urlId": "ID ONLY USED TO INVOC FLYING FUNCTION",
  "secretId": "SECRET ID TO REMOVE/UPDATE/VIEW",
  "name": "NAME OF FLYING FUNCTION",
  "HTTPType": "HTTP REQUEST TYPE FOR YOUR FLYING FUNCTION"
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

**DELETE - /flying/:secretId**  
*removes flying function*  

Responce:  
```json
{
  "message": "Flying function removed"
}
```

## Webhook api

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
  "secretId": "SECRET ID OF REMOVED FLYING FUNCTION",
  "message": "webhook removed!"
}
```

# TODO

## general
- Code cleanup

## doc  

## client
- Validation messages
- Add button to show available globals and examples
- Localstorage for previously create flying functions and webhooks.

## server  
- Add more globals
- Add better api error messages
