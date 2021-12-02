const jwt = require('jsonwebtoken')
const helper = require('../helpers/response')

module.exports = {
  isLogin: (req, res, next) => {
    let token = req.headers.authorization
    // proses 1 check apakah headers dimasukkan ?
    if (token) {
      // proses 2 validasi token
      token = token.split(' ')[1]
      jwt.verify(token, process.env.SECRET_KEY, (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          console.log(error)
          return helper.response(res, 403, error.message)
        } else {
          req.token = result
          next()
        }
      })
    } else {
      return helper.response(res, 400, 'Please login first !')
    }
  },
  isHR: (req, res, next) => {
    const userData = req.token

    if (userData.role !== 'HR') {
      return helper.response(
        res,
        400,
        'Your are not allowed to access this page'
      )
    } else {
      next()
    }
  },
  isVendor: (req, res, next) => {
    const userData = req.token

    if (userData.role !== 'vendor') {
      return helper.response(
        res,
        400,
        'Your are not allowed to access this page'
      )
    } else {
      next()
    }
  }
}
