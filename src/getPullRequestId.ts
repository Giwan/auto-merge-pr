import * as OctokitTypes from '@octokit/types';
import { TOctokit } from './types';

type GetPullRequestIdResponse = {
    repository: {
        pullRequest: {
            id: string
        }
    }
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