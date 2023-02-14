import * as core from '@actions/core';
import { Octokit } from '@octokit/core';
import { getErrorMessage } from './src/getErrorMessage';
import { getOctokitInstance } from './src/getOctokitInstance';
import { getInput } from './src/getInput';
import { getPullRequestId } from './src/getPullRequestId';
import { mergePullRequest } from './src/mergePullRequest';


export const getOwnerAndRepo = function (repository: string) {
    return repository.split('/');
}

async function run() {
    try {

        const inputs = getInput(core);
        core.debug(`inputs ${inputs}`);

        const [owner, repo] = getOwnerAndRepo(inputs.repository);

        const octokitInstance = getOctokitInstance(Octokit, inputs);
        const pullRequestId = await getPullRequestId(octokitInstance, owner, repo, inputs.pullRequestNumber);

        core.debug(`Pull Request Id: ${pullRequestId}`);

        mergePullRequest(octokitInstance, pullRequestId, inputs.mergeMethod);

    } catch (error) {
        core.setFailed(getErrorMessage(error));
    }
}

run();

