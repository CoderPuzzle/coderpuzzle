# Solutions — Shortest Matching Substring

## Segment Occurrences Combined with Binary Search

The two `'*'` split `p` into three literal segments `a`, `b`, `c`; a matching substring is a copy of each non-empty segment in order, connected by arbitrary gaps. Its length is `(end of c) - (start of a)`, so the task reduces to: for each occurrence of the last segment, choose the latest possible occurrence of the previous segment that still fits before it, and so on backwards. Collect the (naturally sorted) occurrence positions of each non-empty segment by scanning `s`, then handle degenerate shapes separately — zero non-empty segments answers 0 (the empty substring is valid), one segment answers its length if it occurs at all.

With two non-empty segments, for every occurrence `j` of the second, binary search the largest occurrence of the first at position `<= j - len1` (so the first segment ends before the second starts); the best candidate is `j + len2 - that position`. The two-`'*'` pattern where a segment is empty simply drops out of the list, and this case also covers it when only one list remains.

With three segments, chaining naively would try every pair of the first two. Instead, precompute for each occurrence `j` of the middle segment the latest occurrence of the first segment ending at or before it (`best_i_for_j`, via one binary search per `j`; it is `None` when none fits). Then sweep the third segment's occurrences `k`: binary search the latest middle occurrence at position `<= k - len2`; because `best_i_for_j` is monotone (later `j` can only allow an equal or later first-segment position), the entry at that index, when defined, is automatically the best pairing, and the candidate length is `k + len3 - best_i_for_j`. Take the minimum, or return `-1` when no chain closes.

Edge cases: empty literal segments between the stars (as in `"**"` or `"*adlogi*"`), overlapping-but-in-order occurrences handled by the `j - len` offsets so segments never overlap, and returning `-1` as soon as some segment never occurs in `s`.

**Complexity:** `O(|s| + |p| + q log q)` time, `O(q)` space, where `q` is the total number of segment occurrences.
