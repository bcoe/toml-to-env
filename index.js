const fs = require('fs')
const toml = require('toml')

module.exports = function (path, cb) {
  process.nextTick(() => {
    try {
      const data = toml.parse(fs.readFileSync(path, 'utf-8'))
      return cb(null, data.environment || {})
    } catch (err) {
      return cb(err)
    }
  })
}
