/**
 * Unit tests for src/read_toml.ts
 * Does not know the Github Action context, so it cannot use core.getInput() or core.setOutput()
 */

import { processTOMLFile } from '../src/read-toml'
import { expect } from '@jest/globals'

import * as fs from 'fs'
import * as path from 'path'

describe('TOML Reader', () => {
  const tempDir = path.join(__dirname, 'temp')
  const tempFilePath = path.join(tempDir, 'file.toml')
  const tomlContent = 'example = { value = "test" }'

  beforeAll(() => {
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    fs.writeFileSync(tempFilePath, tomlContent);
  });

  afterAll(() => {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
    fs.rm(tempDir, { recursive: true }, err => {
      if (err) {
        console.error(err);
      }
    });
  });

  it('should read a field from a TOML file', async () => {
    const fieldPath = 'example.value'
    const expectedValue = 'test'
    fs.writeFileSync(tempFilePath, tomlContent)

    const value = await processTOMLFile(tempFilePath, fieldPath)
    expect(value).toEqual(expectedValue)
  })

  it('should throw an error if the file does not exist', async () => {
    const filePath = 'nonexistent.toml'
    const fieldPath = 'example.value'

    await expect(processTOMLFile(filePath, fieldPath)).rejects.toThrow(
      "File 'nonexistent.toml' not found"
    )
  })

  it('should throw an error for malformed TOML content', async () => {
    const dirPath = 'path/to'
    const filePath = `${dirPath}/malformed.toml`
    const fieldPath = 'example.value'

    fs.mkdirSync(dirPath, { recursive: true })
    fs.writeFileSync(filePath, 'invalid = :malformed_content')

    await expect(processTOMLFile(filePath, fieldPath)).rejects.toThrow(
      /Unexpected character, expecting string, number, datetime, boolean, inline array or inline table/
    )

    // Clean up
    fs.unlinkSync(filePath)
  })

  it.skip('should throw an error if the field is not found in the TOML file', async () => {
    const dirPath = 'path/to'
    const filePath = `${dirPath}/valid.toml`
    const fieldPath = 'nonexistent.field'

    fs.mkdirSync(dirPath, { recursive: true })
    fs.writeFileSync(filePath, 'example = { value = "test" }')

    await expect(processTOMLFile(filePath, fieldPath)).rejects.toThrow(
      "Field 'nonexistent.field' not found in the TOML file"
    )

    // Clean up
    fs.unlinkSync(filePath)
    fs.rm(dirPath, { recursive: true }, err => {
      if (err) {
        console.error(err)
      }
    })
  })

  it.skip('should correctly retrieve a nested field from the TOML file', async () => {
    const filePath = 'path/to/nested.toml'
    const fieldPath = 'nested.example.value'
    const expectedValue = 'nestedTest'
    fs.writeFileSync(filePath, '[nested.example]\nvalue = "nestedTest"')

    const value = await processTOMLFile(filePath, fieldPath)
    expect(value).toEqual(expectedValue)
    fs.unlinkSync(filePath)
  })

  it.skip('should handle non-string field values correctly', async () => {
    const filePath = 'path/to/variety.toml'
    const fieldPathNumber = 'example.number'
    const fieldPathBoolean = 'example.boolean'
    fs.writeFileSync(filePath, 'example = { number = 42, boolean = true }')

    const numberValue = await processTOMLFile(filePath, fieldPathNumber)
    expect(numberValue).toEqual('42') // Assuming conversion to string

    const booleanValue = await processTOMLFile(filePath, fieldPathBoolean)
    expect(booleanValue).toEqual('true') // Assuming conversion to string

    fs.unlinkSync(filePath)
  })

  it.skip('throws an error if the field value is not a string', async () => {
    const filePath = '/path/to/valid.toml'
    const fieldPath = 'example.nonString'

    jest.spyOn(fs, 'existsSync').mockReturnValue(true)
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue('example = { nonString = 123 }')

    await expect(processTOMLFile(filePath, fieldPath)).rejects.toThrow(
      `Expected a string at '${fieldPath}', but found a different type`
    )
  })
})
