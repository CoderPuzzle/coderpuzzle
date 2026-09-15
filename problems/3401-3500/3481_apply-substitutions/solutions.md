# Solutions — Apply Substitutions

The replacements form a dependency graph on keys — a value referencing `%X%`
depends on `X` — and the statement guarantees it is acyclic, so expanding each
key once, bottom-up, settles every placeholder.

## Depth-first expansion with memoization

Define `expand(key)` as the value of `key` with every `%X%` inside it replaced
by `expand(X)`. Because keys are single characters, a placeholder is exactly
three characters wide, and one linear scan splits a value into literal runs
and one-character references: on `'%'` take the next character as the key,
recurse, and skip past its closing `'%'`. A memo map holds each finished
expansion, so even when two values reference the same key (or one value
references it twice) the work below it happens once. With at most ten keys
the recursion bottoms out at depth ten — no cycle can occur and no stack is
in any danger. The text itself is scanned the same way: each `%K%` emits
`expand(K)` and everything else — the underscores included — is copied
verbatim.

Every value is scanned once per reference plus once for the text, so the run
time is linear in the total size of the fully expanded output: the doubling
`"%B%%B%"` pattern tops out at `2⁹ × 8` characters for the deepest legal
chain, about 4 KB, comfortably inside every limit. The memo and the output
buffer dominate the footprint at the same bound.

**Complexity:** `O(V)` time and `O(V)` space, where `V` is the length of the
fully substituted text.
