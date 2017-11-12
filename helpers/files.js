const fs = require('fs')

module.exports = {
  async save (path, data) {
    return new Promise ((resolve, reject) => {
      data = JSON.stringify(data)
      fs.writeFile(path, data, 'utf8', (err) => {
        if (err) {
          return reject(err)
        }
        return resolve()
      })
    })
  },

  async load (path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          return reject(err)
        }
        return resolve(data)
      })
    })
  }
}
