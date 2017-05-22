# Installation

## lerna

See also: https://github.com/lerna/lerna#getting-started

* Install lerna globally
```bash
npm i --g lerna
```

## maxdome-node-libs

* After clone bootstrap all packages
```bash
lerna bootstrap
```

# Publishing

* Commit and push all changes **without** changing versions in the `package.json`
* lerna
```bash
lerna publish
```
* Select for all changed packages `major`, `minor` or `patch` for version bumping
