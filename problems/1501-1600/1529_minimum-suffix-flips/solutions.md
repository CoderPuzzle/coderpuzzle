# Solutions — Minimum Suffix Flips

## Count transitions between consecutive characters

Processing the flips in increasing order of index is always at least as
good as any other order, because flipping suffix `[i, n-1]` and then
suffix `[j, n-1]` with `j > i` leaves the prefix `[i, j-1]` in its final
state for good — nothing later ever touches it again. So the problem
reduces to deciding, one position at a time from left to right, whether
the current bit needs a fresh flip relative to the previous bit.

Track the value the string currently holds at the position just
processed, starting from `'0'` (the initial all-zero string). Walk
`target` left to right: whenever the current character differs from the
tracked value, one more operation is required to flip everything from
here to the end, and the tracked value switches to match it; whenever it
matches, no new operation is needed at this position. Equivalently, the
answer is the number of indices `i` where `target[i] != target[i-1]`,
treating an implicit `'0'` before index 0 — each maximal run of
identical characters in `target` costs exactly one operation, except a
leading run of `'0'`s, which already matches the initial string for
free.

The algorithm scans `target` once, comparing each character to a running
"current bit" tracker and bumping a counter on every mismatch.

**Complexity:** `O(n)` time, `O(1)` space.
