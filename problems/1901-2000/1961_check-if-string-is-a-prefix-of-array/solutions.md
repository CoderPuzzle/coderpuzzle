# Solutions — Check If String Is a Prefix of Array

## Match words in order against the front of s

The definition is constructive: `s` must be the concatenation of some prefix
of `words`, so the answer is found by walking `words` in order and matching
each word against the next stretch of `s`. A single pointer `i` tracks how
much of `s` has been accounted for, and each word must equal
`s[i : i + len(word)]` exactly.

When a word fails to match the slice at the current offset, no larger `k` can
help — the first `k` words are forced in order — so the method returns
`false` immediately. When the pointer reaches the end of `s` right after a
successful word match, the prefix formed so far is exactly `s` and the answer
is `true`; any remaining words are simply never needed.

The check inspects each character of `s` at most once and touches every word
at most once, in a single left-to-right pass.

**Complexity:** `O(len(s))` time, `O(1)` space.
