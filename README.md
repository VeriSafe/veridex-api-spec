## Veridex Api Spec

Contains the Standard Relayer API [OpenAPI Spec](https://github.com/OAI/OpenAPI-Specification) plus specific endpoints used by VeriDex backend.

The package distributes both a javascript object version and a json version.

## Usage

```
yarn serve
```

## Installation

```
yarn install
```

## Development

You can start a development server that will serve a [ReDoc](https://github.com/Rebilly/ReDoc) documentation instance. It uses the `api.json` file from `lib/` (you must have built at least once with `yarn build` or `yarn build-json`) that is based on the `api` object exported from `src`.

```
yarn watch_without_deps
```

The process will watch for changes, but will not hot-reload so you must refresh the page to see the changes.

### Install dependencies

If you don't have yarn workspaces enabled (Yarn < v1.0) - enable them:

```bash
yarn config set workspaces-experimental true
```

Then install dependencies

```bash
yarn install
```


### Clean

```bash
yarn clean
```

### Lint

```bash
yarn lint
```

### Run Tests

```bash
yarn test
```
