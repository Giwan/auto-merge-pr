import type { TInputs } from "./types";

export const getBaseUrl = function () {
    return process.env['GITHUB_API_URL'] || 'https://api.github.com'
}

export const getOctokitInstance = function (Octokit, inputs: TInputs) {
    return new Octokit({
        auth: inputs.token,
        baseUrl: getBaseUrl()
    });
}