# Yves

A CLI utility to speed up the drafting and publishing of pages to the DCRC API. Destined to be deprecated.

- [Available commands](#available-commands)
  - [Draft](#draft)
  - [Publish](#publish)

## Available commands

### Draft
```bash
yves draft
```

| Option  | Usage | Description |
| --- | --- | --- |
| `-s`, `--story` | *Required* | Story to modify. |
| `-f`, `--first` | *Required* | First page of range to draft. |
| `-l`, `--last` | *Optional* | Last page of range to draft. Defaults to argument of `--first`. |
| `-c`, `--command` | *Optional* | Default command for drafted pages. Defaults to `======>`. |
| `-t`, `--layout` | *Optional* | Default layout for drafted pages. Defaults to `layout-default`. |
| `-e`, `--suffix` | *Optional* | Default panel image extension for drafted pages. Defaults to `gif`. |
| `-p`, `--precision` | *Optional* | Default number of significant figures for panel image name. Defaults to `5`. |

### Publish
```bash
yves publish
```

| Option  | Usage | Description |
| --- | --- | --- |
| `-s`, `--story` | *Required* | Story to modify. |
| `-f`, `--first` | *Required* | First page of range to publish. |
| `-l`, `--last` | *Optional* | Last page of range to publish. Defaults to argument of `--first`. |