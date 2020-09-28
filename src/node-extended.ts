import { exec } from "child_process";
import util from "util";
import process from "process";
import readline from "readline";
import nodeFetch, { Response } from "node-fetch";

/**
 * A collection of node helper functions
 */

/**
 * Execute a command
 *
 * @param command
 */
async function execute(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
}

/**
 * Read input from the user
 *
 * @param input
 * @returns {Promise<string>}
 */
async function input(input: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`${input} `, (answer: string) => {
      rl.close();
      resolve(answer);
    });
  });
}

/**
 * Whether the user accepted the input
 *
 * @param input
 */
function isAnswerYes(input: string): boolean | null {
  return !!input.match(/[yY]/g);
}

/**
 * Fetch a file from an endpoint
 *
 * @param endpoint
 * @param bearerToken
 */
async function fetchFile(
  endpoint: string,
  bearerToken?: string
): Promise<ArrayBuffer> {
  const options = bearerToken
    ? {
        headers: { Authorization: `Bearer ${bearerToken}` },
      }
    : {};
  const response = await nodeFetch(endpoint, options);
  const data = await response.arrayBuffer();
  return data;
}

/**
 * Fetch anything.
 * Uses node-fetch under the hood.
 *
 * @param endpoint
 * @param bearerToken
 */
async function fetch(
  endpoint: string,
  bearerToken?: string
): Promise<Response> {
  const options = bearerToken
    ? {
        headers: { Authorization: `Bearer ${bearerToken}` },
      }
    : {};
  const response = await nodeFetch(endpoint, options);
  return response;
}

export default { execute, isAnswerYes, input, fetchFile, fetch };

// For require();
exports.NodeExtended = ({ execute, isAnswerYes, input, fetchFile, fetch });
