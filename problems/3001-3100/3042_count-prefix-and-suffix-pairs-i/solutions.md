# Solutions — Count Prefix and Suffix Pairs I

## Pairwise Prefix-and-Suffix Checks

With at most 50 words of at most 10 characters each, every pair can be
examined directly; no indexing structure is needed.

The solution walks all index pairs `i < j` and tests `words[i]` against
`words[j]` with one helper. The helper first rejects the impossible case where
`words[i]` is longer than `words[j]`, then scans `words[i]` once, checking that
its `index`-th character matches both the `index`-th character of `words[j]`
(the prefix half) and the character sitting `len(words[i])` slots from the end
of `words[j]` (the suffix half). A single mismatch rejects the pair, and the
answer is the number of pairs that survive.

**Complexity:** `O(n² · L)` time for `n` words of maximum length `L`, `O(1)`
extra space.
