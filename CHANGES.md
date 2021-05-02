# eslint-plugin-query CHANGES

## 0.8.0

### User-impacing

- Enhancement: Add `no-missing-syntax` rule
- npm: Update dep. eslint (minor)

### Dev-impacting

- Linting: As per latest ash-nazg
- Refactoring: Simplify query
- npm: Switch to pnpm
- npm: Update devDeps. (including changing peerDeps. per latest ash-nazg)
- npm: Switch to stable `mocha-multi-reporters`

## 0.7.1

- Docs: Elaborate on global installation; fix CLI link; add screenshot
- Docs: Clarifiy re: "errors" in command

## 0.7.0

- Enhancement: Add `notGlob` option

## 0.6.0

- Enhancement: Add CLI and programmatic API (distinct from use as
    ESLint plugin)
- Enhancement: Add `json-stringify` format option and make it the
    default (easier with line breaks, yet still readable)
- Docs: Update license badges
- npm: Add `--corrections` for license badge generation (deprecated
    but valid license format was not being processed)

## 0.5.0

- Enhancement: Add `meta: {type: "suggestion"}`
- Docs: Update coverage badge per latest coveradge
- Docs: Update badges per latest updates
- npm: Update devDeps (linting, badges, mocha/nyc)
- npm: `package-lock.json`
- Testing: Update test expectations per latest eslint (dropped
    `start`/`end` properties)

## 0.4.0

- Breaking change: `parent` functionality now defaults to `false`.
- Enhancement: If `format` is "node", setting `parent` to `true`
    will also show the `parent` properties on the AST.

## 0.3.0

- Enhancement: Add `format`/`defaultFormat` with `"node"` returning the
    AST stringified object.
- Docs: Indicate differences with `no-restricted-syntax`; closes #1
- Docs: Comparison to `equery`
- Docs: Add license badges
- Docs: Tips

## 0.2.0

- License: Fix `package.json` reference to MIT
- Breaking change: Remove `ruleID` (just hard-code "query" if using)
- Linting: Disable `no-template-curly-in-string` rule
- Docs: Show fuller query; clarify; to-dos; coverage badge color
- Testing: Add for slicing

## 0.1.0

- Initial version
