# eslint-plugin-query CHANGES

## ?

- npm: Update devDeps

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
