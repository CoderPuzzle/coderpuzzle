# Solutions — Query Kth Smallest Trimmed Number

## Sort indices by the trimmed suffix for each query

Every query is independent — the note says each number resets to its
original length afterward — so answer it directly: cut the rightmost `trim`
digits off every string and find the `k`th smallest of those suffixes.
Because all strings share one length, all trimmed suffixes share one length
too, and lexicographic comparison of equal-length digit strings is exactly
numeric comparison; no integer conversion is needed, which also sidesteps
any width limit since a suffix can have up to 100 digits.

For each query, pair every index with its trimmed suffix and sort the pairs
by (suffix, original index). Sorting is stable in most languages anyway,
but carrying the index as an explicit tie-break makes the rule "equal
trimmed numbers compare by lower index" hold regardless. The `(k-1)`-th
entry of the sorted order supplies the answer's index. Repeated trims could
share work through per-trim bucketing or radix passes over the digits, but
at these limits (100 queries over 100 strings) a plain sort per query is
already far inside bounds.

**Complexity:** `O(q · n log n + q · n · L)` time with `n` strings of
length `L` and `q` queries — the second term is slicing the suffixes;
`O(n)` extra space per query.
