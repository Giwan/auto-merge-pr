import * as OctokitTypes from '@octokit/types';
import { TOctokit } from "./types";

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