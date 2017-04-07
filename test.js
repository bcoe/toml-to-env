/* global describe, it */

const tomlToEnv = require('./')
const exec = require('child_process').execSync

require('chai').should()

describe('toml-to-env', () => {
  describe('api', () => {
    it('returns environment as key/value pairs if present', (done) => {
      tomlToEnv('./fixtures/conf-with-env.toml', (err, env) => {
        if (err) return done(err)
        env.NODE_ENV.should.equal("ben's awesome env")
        env.PORT.should.equal(9200)
        env.METRICS.should.equal('127.0.0.1')
        return done()
      })
    })

    it('returns empty environment if environment stanza does not exist', (done) => {
      tomlToEnv('./fixtures/conf-without-env.toml', (err, env) => {
        if (err) return done(err)
        env.should.eql({})
        return done()
      })
    })
  })

  describe('cli', () => {
    it('generates export statements for environment', () => {
      const output = exec('./bin/toml-to-env.js ./fixtures/conf-with-env.toml').toString('utf8')
      output.should.match(/export PORT=9200/)
    })

    it('escapes special characters appropriately', () => {
      const output = exec('./bin/toml-to-env.js ./fixtures/conf-with-env.toml').toString('utf8')
      output.should.match(/export NODE_ENV='ben'\\''s awesome env'/)
    })

    describe('unset', () => {
      it('provides a command for unsetting environment variables', () => {
        const output = exec('./bin/toml-to-env.js unset ./fixtures/conf-with-env.toml').toString('utf8')
        output.should.match(/unset NODE_ENV/)
      })
    })
  })
})
