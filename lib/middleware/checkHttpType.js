'use strict'

const checkHttpType = (req, res, next) => {
  const { 
    HTTPType,
  } = res.locals.flyingFunctionData
  
  if(req.method != HTTPType){
    return res.status(400).json({message: 'Wrong http type'})
  }  

  next()
}

module.exports = checkHttpType
