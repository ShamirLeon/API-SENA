export default {
  /**
   * @param {Function} res
   * @param {String} code
   * @param {String} message
   * @param {Any} data
   */
  response: (res, code, message, data) => {
    code = code ? parseInt(code, 10) : 200
    if (code === 200) {
      return res.status(code).json({ code, message, data })
    } else if (code === 500) {
      return res.status(code).json({ code, message, data })
    } else {
      return res.status(code).json({ code, message, data })
    }
  },

  /**
   * @param {Function} res
   * @param {String} err
   * @param {String} message
   * @param {Any} data
   */
  success: (res, message, data) => {
    res.status(200).json({ code: 200, message, data })
  },

  /**
   * @param {Function} res
   * @param {Number} status
   * @param {String} message
   * @param {String} error code
   */
  error: (res, code, message, data) => {
    res.status(code).json({ code, message, data })
  },

  authResponse: (res, err, data) => {
    err ? res.status(401).json({ code: 401, message: 'Unauthorized', data }) : res.status(200).json({ code: 200, message: 'Authorized', data })
  }
}
