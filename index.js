const fs = require('fs')
const TOML = require('@iarna/toml')

module.exports = function (path, cb) {
  process.nextTick(() => {
    try {
      const data = TOML.parse(fs.readFileSync(path, 'utf-8'))
      return cb(null, data.environment || {})
    } catch (err) {
      return cb(err)
    }
  })
}
