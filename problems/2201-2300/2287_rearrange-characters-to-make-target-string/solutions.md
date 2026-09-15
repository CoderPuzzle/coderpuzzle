# Solutions — Rearrange Characters to Make Target String

## Counting letters

Rearranging makes the order of letters in s irrelevant — only how many of
each letter it holds matters. One copy of target consumes exactly
`need[ch]` copies of every letter `ch` it contains, so the `have[ch]`
letters available in s cover `floor(have[ch] / need[ch])` copies' worth of
that letter.

Counting both strings once and taking the minimum of those quotients over
the distinct letters of target yields the answer. A letter target needs but
s lacks has a quotient of zero, so the "cannot form even one copy" cases
fall out of the same formula with no special handling.

**Complexity:** `O(|s| + |target|)` time, `O(1)` space.
