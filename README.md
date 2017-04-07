# toml-to-env

provide a [TOML](https://github.com/toml-lang/toml) configuration file
with an `environment` stanza, and _toml-to-env_ will output the
appropriate `export` commands to configure an enviornment:

```bash
export METRICS='127.0.0.1'
export PORT=9200
```

Use `toml-to-env` in a shell script like so:

```bash
#!/usr/bin/env bash
eval $(toml-to-env /path/to/config.toml)
```

To unset an environment, do:

```bash
eval $(toml-to-env unset /path/to/config.toml)
```

## License

ISC
