/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'

import * as fs from 'fs'
import * as path from 'path'

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

// Mock the GitHub Actions core library
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let debugMock: jest.SpyInstance
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let errorMock: jest.SpyInstance
let getInputMock: jest.SpyInstance
let setFailedMock: jest.SpyInstance
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let setOutputMock: jest.SpyInstance

describe('action', () => {
  const tempDir = path.join(__dirname, 'temp')
  const tempFilePath = path.join(tempDir, 'file.toml')
  const tomlContent = 'example = { value = "test" }'
  const expectedOutputValue = 'test'

  beforeAll(() => {
    fs.mkdirSync(tempDir)
    fs.writeFileSync(tempFilePath, tomlContent)
  })

  beforeEach(() => {
    jest.clearAllMocks()

    debugMock = jest.spyOn(core, 'debug').mockImplementation()
    errorMock = jest.spyOn(core, 'error').mockImplementation()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
    setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()
  })

  afterAll(() => {
    fs.unlinkSync(tempFilePath)
    fs.rm(tempDir, { recursive: true }, err => {
      if (err) {
        console.error(err)
      }
    })
  })

  it('processes valid TOML file and field', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'file':
          return tempFilePath
        case 'field':
          return 'example.value'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveBeenCalled()
    //expect(runMock).toHaveReturned()

    // Verify that core.setOutput was called with the expected value
    expect(core.setOutput).toHaveBeenCalledWith('value', expectedOutputValue)
  })

  it('sets a failed status for non-existent file', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'file':
          return 'nonexistent.toml'
        case 'field':
          return 'example.value'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveBeenCalled()

    // Verify that core.setFailed was called with the expected error message
    expect(core.setFailed).toHaveBeenCalledWith(
      "File 'nonexistent.toml' not found"
    )
  })

  it('throws an error if the file input is missing', async () => {
    getInputMock.mockImplementation((name: string) => {
      if (name === 'field') {
        return 'example.value'
      }
      return ''
    })

    await main.run()
    expect(setFailedMock).toHaveBeenCalledWith("Input 'file' is required")
  })

  it('throws an error if the field input is missing', async () => {
    getInputMock.mockImplementation((name: string) => {
      if (name === 'file') {
        return tempFilePath
      }
      return ''
    })

    await main.run()
    expect(setFailedMock).toHaveBeenCalledWith("Input 'field' is required")
  })
})
