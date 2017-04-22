'use strict'

const checkHttpType = (req, res, next) => {
  const { 
    flyingFunctionData: {
      HTTPType,
    },
  } = res.locals
  
  if(req.method != HTTPType){
    return res.status(400).json({message: 'Wrong http type'})
  }  

  next()
}

module.exports = checkHttpType
