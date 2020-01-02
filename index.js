const fs = require('fs')

class FileCache {
  constructor (path = '.') {
    this.path = path
  }

  remember (key, ttl, cb) {
    return new Promise((resolve, reject) => {
      fs.readFile(`${this.path}/file-cache-${key}`, 'utf8', (err, contents) => {
        if (typeof contents === 'string') {
          try {
            let obj = JSON.parse(contents)

            if (+new Date <= obj.expiration) {
              return resolve(obj.data)
            }
          } catch (err) {
            console.log(err)
          }
        }

        let data = cb()
        fs.writeFile(`${this.path}/file-cache-${key}`, JSON.stringify({
          data,
          expiration: +new Date + ttl * 1000,
        }), () => {
          resolve(data)
        })
      })
    })
  }
}

export default FileCache
