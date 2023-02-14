import { TOctokit } from "./types";
export declare const mergePullRequest: (octokit: TOctokit, pullRequestId: string, mergeMethod?: string) => Promise<void>;
