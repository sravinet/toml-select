/**
 * Unit tests for src/read_toml.ts
 * Does not know the Github Action context, so it cannot use core.getInput() or core.setOutput()
 */

import { processTOMLFile } from '../src/read-toml'
import { expect } from '@jest/globals'
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs'
import * as path from 'path'

describe('TOML Reader', () => {
  const tempDir = process.env.RUNNER_TEMP || path.join(__dirname, 'temp');
  let tempFilePath: string;
  let uniqueFilename: string;

  beforeAll(() => {
    // If not within Github Runner, create the temp directory if it doesn't exist
    if (!process.env.RUNNER_TEMP && !fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }
  });

  afterAll(() => {
    if (!process.env.RUNNER_TEMP) {
      try {
        fs.rmSync(tempDir, { recursive: true });
      } catch (error) {
        console.error(`Error removing temporary directory: ${error}`);
      }
    }
  });

  beforeEach(() => {
    uniqueFilename = `file-${uuidv4()}.toml`;
    tempFilePath = path.join(tempDir, uniqueFilename);
  });

  afterEach(() => {
    if (!process.env.RUNNER_TEMP) {
      try {
        if (fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }
      } catch (error) {
        console.error(`Error removing temporary file: ${error}`);
      }
    }
  });

  it('should read a field from a TOML file', async () => {
    const fieldPath = 'example.value';
    const expectedValue = 'test';
    fs.writeFileSync(tempFilePath, 'example = { value = "test" }');

    const value = await processTOMLFile(tempFilePath, fieldPath);
    expect(value).toEqual(expectedValue);
  });

  it('should throw an error if the file does not exist', async () => {
    const filePath = 'nonexistent.toml'
    const fieldPath = 'example.value'

    await expect(processTOMLFile(filePath, fieldPath)).rejects.toThrow(
      "File 'nonexistent.toml' not found"
    )
  })

  it('should throw an error for malformed TOML content', async () => {
    const fieldPath = 'example.value'
    //? const expectedValue = 'test'
    fs.writeFileSync(tempFilePath, 'invalid = :malformed_content')

    await expect(processTOMLFile(tempFilePath, fieldPath)).rejects.toThrow(
      /Unexpected character, expecting string, number, datetime, boolean, inline array or inline table/
    )

  })

  it.skip('should throw an error if the field is not found in the TOML file', async () => {
    const fieldPath = 'nonexistent.field'

    fs.writeFileSync(tempFilePath, 'example = { value = "test" }')

    await expect(processTOMLFile(tempFilePath, fieldPath)).rejects.toThrow(
      "Field 'nonexistent.field' not found in the TOML file"
    )

  })

  it.skip('should correctly retrieve a nested field from the TOML file', async () => {
    const fieldPath = 'nested.example.value'
    const expectedValue = 'nestedTest'

    fs.writeFileSync(tempFilePath, '[nested.example]\nvalue = "nestedTest"')

    const value = await processTOMLFile(tempFilePath, fieldPath)
  
    expect(value).toEqual(expectedValue)
  
  })

  it.skip('should handle non-string field values correctly', async () => {
    const fieldPathNumber = 'example.number'
    const fieldPathBoolean = 'example.boolean'
    fs.writeFileSync(tempFilePath, 'example = { number = 42, boolean = true }')

    const numberValue = await processTOMLFile(tempFilePath, fieldPathNumber)
    expect(numberValue).toEqual('42') // Assuming conversion to string

    const booleanValue = await processTOMLFile(tempFilePath, fieldPathBoolean)
    expect(booleanValue).toEqual('true') // Assuming conversion to string
  })

  it.skip('throws an error if the field value is not a string', async () => {
    const fieldPath = 'example.nonString'

    jest.spyOn(fs, 'existsSync').mockReturnValue(true)
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue('example = { nonString = 123 }')

    await expect(processTOMLFile(tempFilePath, fieldPath)).rejects.toThrow(
      `Expected a string at '${fieldPath}', but found a different type`
    )

  })
})
