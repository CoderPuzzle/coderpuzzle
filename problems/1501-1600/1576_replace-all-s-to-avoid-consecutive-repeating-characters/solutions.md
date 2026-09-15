# Solutions — Replace All ?'s to Avoid Consecutive Repeating Characters

## Greedy left-to-right pass

Each `'?'` only has to avoid two neighbors: the character immediately
before it and the character immediately after it. With just three
candidate letters `'a'`, `'b'`, `'c'` to choose from, at most two of them
can already be taken by those neighbors, so at least one candidate is
always free — there is never a need to backtrack or look further ahead.

The algorithm walks `s` once. At each `'?'`, it looks at the character
already fixed to its left — which is either an original letter or a
`'?'` that was already replaced earlier in the same pass — and, only
when the character to the right is not itself `'?'`, at that original
letter too. It tries `'a'`, `'b'`, `'c'` in that order and keeps the
first one that matches neither neighbor. Scanning left to right is what
guarantees the left neighbor is always already resolved by the time it
is compared against, and trying the letters in the same fixed order on
every `'?'` is what makes the result reproducible whenever more than one
replacement would have been valid.

**Complexity:** `O(n)` time, `O(n)` space.
