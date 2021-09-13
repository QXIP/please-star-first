# Please Star First GitHub Action

### OSS Starring Partner

This GitHub Action automatically comments issues opened by non-stargazers.

**Feel free to try out in this repository!**

## Usage

```yml
on:
  issues:
    types: [opened, reopened]

jobs:
  greet:
    runs-on: ubuntu-latest
    name: Comment issue opened by non-stargazer
    steps:
      - name: star
        uses: qxip/please-star-light@v1.0.0
```
