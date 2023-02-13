import * as core from '@actions/core';
type TCore = typeof core;

export const getInput = function (core: TCore) {
    return {
        token: core.getInput('token'),
        repository: core.getInput('repository'),
        pullRequestNumber: Number(core.getInput('pull-request-number', { required: true })),
        mergeMethod: core.getInput('merge-method')
    }
}