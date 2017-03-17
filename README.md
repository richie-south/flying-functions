# flying-functions
functions in the cloud with rest api

**Function**  
write your function like this
```javascript
/*
 * @param query [express req.query]
 */
(query) => {
  // Your code here

  return 10
}
```

**Resppnse**  
Response from server executing function above
```json
{
  "result": 10,
  "invocations": 1
}
```


# TODO

- Add webhook for function invocations
- Re-implement string evaluation
- Add more globals 
- Check microservices 
- Add some auth and private functions
  - delete
  - update
- Use express pipes
- Update api structure
- ~~async stored function invocations~~