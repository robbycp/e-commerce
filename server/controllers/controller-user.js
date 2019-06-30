const User = require('../models/model-user')
const Token = require('../models/model-blacklist-token')
const { compareHash } = require('../helpers/hash-helpers')
const { generateToken, decodeToken } = require('../helpers/jwt-helper')

class ControllerUser {
  static login(req, res, next) {
    let { username, password } = req.body
    let userData
    User.findOne({ username })
      .then((user) => {
        userData = user
        if (!user) throw {code: 401, message: 'Username / password Invalid'}
        else {
          return compareHash(password, user.password)
        }
      })
      .then(result => {
        if (!result) throw {code: 401, message: 'Username / password Invalid'}
        else {
          let payload = {
            userId: userData._id
          }          
          let token = generateToken(payload)
          res.status(200).json({
            token: token,
            token_type: 'default'
          })
        }
      })
      .catch(next)
  }
  
  static logout(req, res, next) {
    let token = req.headers.token
    Token.create({ token: token })
      .then((token) => {
        res.status(201).json({ message: 'Successfully log out' })
      })
      .catch(next)
  }

  static register(req, res, next) {
    let newUser = {
      full_name: req.body.full_name,
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      admin: req.body.admin || false,
    }
    User.create(newUser)
      .then((user) => {
        let sendUser = {
          _id: user._id,
          full_name: user.full_name,
          email: user.email,
          username: user.username,
          admin: user.admin || false,
        }
        res.status(201).json(sendUser)
      })
      .catch(next)
  }

  static profileData(req, res, next) {
    let payload = decodeToken(req.headers.token)
    User.findOne({ _id: payload.userId })
      .then((result) => {
        let sendData = {
          full_name: result.full_name,
          username: result.username,
          email: result.email,
          id: result._id,
          admin: result.admin
        }
        res.json(sendData)
      })
      .catch((err) => {
        console.log(err);
        next()
      })
  }
}

module.exports = ControllerUser