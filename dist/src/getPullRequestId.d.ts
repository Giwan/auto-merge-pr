import { TOctokit } from './types';
export declare const getPullRequestId: (octokit: TOctokit, owner: string, repo: string, pullRequestNumber: number) => Promise<string>;
