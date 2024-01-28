/**
 *  @fileoverview This file contains the main function that processes a TOML file.
 */
import * as toml from '@iarna/toml'
import * as fs from 'fs'

/**
 * @param filePath The path to the TOML file.
 * @param fieldPath The path to the field to retrieve.
 * @returns {Promise<string>} Resolves with the string value of the field.
 */
export async function processTOMLFile(
  filePath: string,
  fieldPath: string
): Promise<string> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File '${filePath}' not found`)
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const tomlObject: toml.JsonMap = toml.parse(fileContent)

  //let value: toml.JsonMap | string = tomlObject;

  const fields = fieldPath.split('.')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let currentValue: any = tomlObject

  for (const field of fields) {
    if (currentValue[field] === undefined) {
      throw new Error(`Field '${field}' not found in the TOML file`)
    }
    currentValue = currentValue[field]
  }

  if (typeof currentValue !== 'string') {
    throw new Error(
      `Expected a string at '${fieldPath}', but found a different type`
    )
  }

  return currentValue
}
