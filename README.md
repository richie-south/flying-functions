# flying-functions  
Your functions in the cloud with rest api  

<img src="https://raw.githubusercontent.com/richie-south/flying-functions/master/ff.png" width="200">  

# TODO  

## client
- CRUD flying function
- CRUD webhook


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
- Look at solution for persistence storage with flying functions

# How to

**Function**  
write your function like this
```javascript
/*
 * Function can be async if you want
 * @param data [express req.query or express req.data]
 */
module.exports = async (data) => {
  // your code here
  return 10;
};
```

**Resppnse**  
Response from server executing function above
```json
{
  "result": 10,
  "invocations": 1,
  "self": "" // url to self
}
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
