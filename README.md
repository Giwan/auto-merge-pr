# auto-merge action

Use this action to auto-merge pull requests. 

## Usage

```yml

    - uses: giwan/auto-merge-pr@v2
      with:
        pull-request-number: ${{ github.event.pull_request.number }}
```

### Action inputs

Name | Description | Default
---|---|---
`pull-request-number` | The PR number which can be accessed using ${{ github.event.pull_request.number }}. This is a required value and is the only one that can't be provided by default.
`merge-method`| Use this if you would like to change the default merge method | `SQUASH`

_note: The `repository` and `token` values are provided by default in `action.yml`. There's no action for you to provide this. It is however used inside the script._


## Example
There are cases where PRs are created by bots. If thes are patch and minor, it could be valuable to auto-merge these if all the tests pass. 
Here's an example workflow with two jobs to do just that. In this case the bot is Snyk so the PRs are limited to branches starting with `snyk-`

```yml

name: auto-merge bot PRs

on:
  pull_request:
    types: [ready_for_review, reopened, synchronize, opened]
  pull_request_review:
    types: [ submitted ]

permissions: write-all

jobs:
  install_job:
    if: startsWith(github.head_ref, 'snyk-')
    runs-on: [self-hosted, size/small]

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install dependencies
        run: npm ci

      - name: test
        run: npm t

  auto_merge_job:
    needs: install_job
    runs-on: [self-hosted, size/small]

    steps:
      - uses: giwan/auto-merge-pr@v1
        with:
          pull-request-number: ${{ github.event.pull_request.number }}
```