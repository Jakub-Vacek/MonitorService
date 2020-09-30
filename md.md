**Basic example**: run DX Scanner on each push to the repo

Create `.github/workflows/main.yml`.

```yml
name: DX Scanner
on: push
jobs:
  dx-scanner:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Runs DX Scanner on the code
        uses: docker://dxheroes/dx-scanner:latest
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

[Generate your Github personal token](https://github.com/settings/tokens/new) and [set it as an encrypted secret](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets) named `GITHUB_TOKEN`.
