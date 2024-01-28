import * as core from '@actions/core'
import { processTOMLFile } from './read-toml'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const file: string = core.getInput('file')
    if (!file) {
      throw new Error("Input 'file' is required")
    }

    const field: string = core.getInput('field')
    if (!field) {
      throw new Error("Input 'field' is required")
    }

    const value = await processTOMLFile(file, field)
    core.setOutput('value', value)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
