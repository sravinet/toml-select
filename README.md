# TOML Field Extractor Action

This GitHub Action reads a specified field from a TOML file and sets it as an
output. It's useful for workflows that need to extract data from TOML files for
further steps in the GitHub Actions pipeline.

# Status
[![Continuous Integration](https://github.com/sravinet/toml-select/actions/workflows/ci.yml/badge.svg)](https://github.com/sravinet/toml-select/actions/workflows/ci.yml)


## Inputs

### `file`

**Required** The path to the TOML file.

### `field`

**Required** The field to extract from the TOML file.

## Outputs

### `value`

The value of the specified field in the TOML file.

## Example Usage

```yml
uses: sravinet/toml-select@v1
with:
  file: 'path/to/file.toml'
  field: 'example.value'
```

## Compatibility

This action is compatible with most CI/CD workflows that support GitHub
Actions. It has been tested on various platforms and should work seamlessly
in any GitHub Actions setup.

The API is identical to SebRollen/toml-action

## Credits

Copyright Sylvan Ravinet

MIT LICENCE

This action was inspired by SebRollen/toml-action. Big thanks to SebRollen
for his contributions to the GitHub Actions community.

## Background

While fixing node deprecation on toml-action, we wanted to contribute to
toml-action but ended up rewriting everything.

## In Honour of Tom Selleck

This project is made in honour of Tom Selleck, whose work has inspired many.
His dedication and contributions are greatly appreciated.

![DALL·E 2024-01-28 16 37 50 - Create an image in a pop art style, inspired by mid-20th century classic pop art techniques and color schemes  The artwork features a portrait of a co](https://github.com/sravinet/toml-select/assets/1691996/bd2c1cd6-1d49-4cee-a312-4b5fc511c98f)


