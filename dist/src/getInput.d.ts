import * as core from '@actions/core';
type TCore = typeof core;
export declare const getInput: (core: TCore) => {
    token: string;
    repository: string;
    pullRequestNumber: number;
    mergeMethod: string;
};
export {};
