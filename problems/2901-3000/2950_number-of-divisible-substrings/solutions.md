# Solutions — Number of Divisible Substrings

## Prefix sums with pairwise substring scans

A substring is judged only by the sum of its mapped digits and its length,
so the work is pairing every start with every end and asking whether the
sum over `word[start..end)` is divisible by `end - start`. Enumerating all
`O(n²)` pairs is the intended budget for `n <= 2000`; the only trap is
recomputing each substring's sum from scratch, which would blow the pair
scan up to `O(n³)`.

A prefix-sum array removes the recomputation: `pre[i]` holds the mapped
sum of the first `i` characters, so the substring `word[start..end)` costs
`pre[end] - pre[start]` — constant time per pair, exactly what Hints 2 and
3 point at. The modulus `end - start` is always at least 1, so the inner
test needs no special cases, and single-character substrings pass
automatically because every digit is divisible by 1.

Both bounds stay far inside 32-bit range: a mapped sum is at most
`2000 * 9 = 18000`, and the answer at most `2000 * 2001 / 2 = 2001000`.

**Complexity:** `O(n²)` time, `O(n)` space.
