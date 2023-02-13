import * as core from '@actions/core';
import { Octokit } from '@octokit/core';
import * as OctokitTypes from '@octokit/types';
import { getErrorMessage } from './src/getErrorMessage';
import { getOctokitInstance } from './src/getOctokitInstance';
import { getInput } from './src/getInput';

type TOctokit = InstanceType<typeof Octokit>;

type GetPullRequestIdResponse = {
    repository: {
        pullRequest: {
            id: string
        }
    }
}

export const getOwnerAndRepo = function (repository: string) {
    return repository.split('/');
}

export const getPullRequestId = async function (octokit: TOctokit, owner: string, repo: string, pullRequestNumber: number): Promise<string> {

    const params: OctokitTypes.RequestParameters = {
        owner,
        repo,
        pullRequestNumber
    }

    const query = `query GetPullRequestId($owner: String!, $repo: String!, $pullRequestNumber: Int!) {
        repository(owner: $owner, name: $repo) {
            id
        }
    }`;

    const response = await octokit.graphql<GetPullRequestIdResponse>(query, params);
    return response.repository.pullRequest.id;
}

export const mergePullRequest = async function (octokit: TOctokit, pullRequestId: string, mergeMethod = 'SQUASH') {
    const params: OctokitTypes.RequestParameters = {
        pullRequestId,
        mergeMethod
    }

    const query = `mutation mergePullRequest($pullRequestId: ID!) {
        mergePullRequest(input: { pullRequestId: $pullRequestId }) {
            clientMutationId
        }
    }`;

    octokit.graphql(query, params);
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

