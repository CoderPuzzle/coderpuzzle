# Solutions — Find the Shortest Superstring II

## Containment, then maximum suffix–prefix overlap merge

If one string already contains the other, that longer string is obviously
the shortest superstring and nothing needs to be built. Otherwise the two
strings must each contribute characters, and the cheapest way to glue two
strings together is to overlap a suffix of one with an equal-length prefix
of the other: a merge `s1 + s2[ov:]` is a valid superstring whenever the
last `ov` characters of `s1` equal the first `ov` characters of `s2`, and
its length `len(s1) + len(s2) - ov` shrinks as the overlap grows. So the
answer is the merge with the largest overlap, scanned in both directions.

The code computes `ov1`, the largest `k` with `s1` ending in `s2`'s first
`k` characters, and `ov2`, the same with the roles swapped, each by trying
candidate lengths from the longest possible down (first hit wins). It then
emits `s1 + s2[ov1:]` when `ov1 >= ov2` and the mirrored merge otherwise;
the `>=` makes the first direction win ties, which keeps the answer
deterministic. Both scans do `O(min * max)` character comparisons with
`n, m <= 100`, so the whole method is a few thousand operations.

**Complexity:** `O(n * m)` time, `O(n + m)` space.
