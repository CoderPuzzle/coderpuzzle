# Solutions — Rearrange K Substrings to Form Target String

## Chunk Multiset Comparison

Splitting `s` into `k` equal chunks and reordering them can produce `t`
exactly when `s`'s chunk sequence, viewed as a multiset, equals `t`'s
chunk sequence viewed the same way: the concatenation order is free, so
the only thing that matters is which pieces exist and how often. The
chunk size is `len(s) / k`, guaranteed to divide evenly.

Hash-counting settles it in one pass: count every chunk of `s` in a map,
then walk `t`'s chunks and consume one occurrence of each. Any chunk of
`t` whose count is already exhausted — or was never counted — proves the
multisets differ and the answer is `false`; consuming all `k` chunks
without failure proves the rearrangement exists. Each chunk is built
once and hashed in time proportional to its length, so the whole scan is
linear in the total string length.

The guaranteed anagram property between `s` and `t` is a red herring —
character-level multisets always match, but chunk boundaries still
differ, which is exactly what the per-chunk comparison detects
(`"aabbcc"` with `k = 2` splits as `"aab" | "bcc"` versus `"bba" |
"acc"`). Inputs run to `2 * 10⁵` characters, so a quadratic comparison
of chunks would time out; the hash pass stays linear.

**Complexity:** `O(n)` time, `O(n)` space.
