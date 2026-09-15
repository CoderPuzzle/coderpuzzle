# Solutions — Longest Substring of One Repeating Character

## Segment tree over runs

With up to `10^5` point updates each followed by a global "longest run" query, an offline scan is hopeless — the natural tool is a segment tree where each node summarizes its segment by five facts: the segment length, its leftmost and rightmost characters, the longest prefix consisting of one repeated character, the longest such suffix, and the best run anywhere inside. The answer after each update is just the root's `best` field.

Merging two children is the crux. The parent's prefix is the left child's prefix, extended by the right child's prefix only when the left child is _entirely_ one run (`pref[l] == seg_len[l]`) and the two boundary characters agree; the suffix is handled symmetrically on the right. A run can also straddle the boundary, contributing `suf[l] + pref[r]` when the left child's rightmost character equals the right child's leftmost character, and the parent's `best` is the maximum of the two children's bests and that joined candidate. These fields are exactly enough information to recompute a parent from its two children without ever looking at the underlying string.

The tree is built once bottom-up in `O(n)`; each query overwrites one leaf — updating both the tree node and the `chars` array — and then recomputes the `O(log n)` nodes on the path back to the root via `pull`. Reading `best[1]` afterwards costs `O(1)`, so `k` queries cost `k log n`. Leaf nodes hold the trivial summary (a run of length 1), and the `n == 0` guard keeps the build well-defined for an empty string.

**Complexity:** `O(n + k log n)` time, `O(n)` space.
