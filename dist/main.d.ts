import * as core from '@actions/core';
import { Octokit } from '@octokit/core';
type TOctokit = InstanceType<typeof Octokit>;
type TCore = typeof core;
export declare const getInput: (core: TCore) => {
    token: string;
    repository: string;
    pullRequestNumber: number;
    mergeMethod: string;
};
export declare const getOwnerAndRepo: (repository: string) => string[];
export declare const getPullRequestId: (octokit: TOctokit, owner: string, repo: string, pullRequestNumber: number) => Promise<string>;
export declare const mergePullRequest: (octokit: TOctokit, pullRequestId: string, mergeMethod?: string) => Promise<void>;
export {};
