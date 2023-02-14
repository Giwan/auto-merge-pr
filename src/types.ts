import { Octokit } from '@octokit/core';

export type TInputs = {
    token: string;
    repository: string;
    pullRequestNumber: number;
    mergeMethod: string;
}

export type TOctokit = InstanceType<typeof Octokit>;