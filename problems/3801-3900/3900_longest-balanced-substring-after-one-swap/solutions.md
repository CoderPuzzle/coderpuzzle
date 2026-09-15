# Solutions — Longest Balanced Substring After One Swap

Encode `1` as `+1` and `0` as `-1`. A substring is either already balanced,
or one swap across its boundary must change its balance by exactly two.

## Prefix balances with sliding earliest positions

A usable substring therefore has balance `0`, balance `+2` with a zero
available outside it, or balance `-2` with a one available outside it. For a
`+2` substring of length `L`, the outside-zero condition is equivalent to
`L <= 2 * totalZeros`; symmetrically, a `-2` substring must satisfy
`L <= 2 * totalOnes`.

For each of these three target balances, scan the prefix sums while a hash map
stores queues of prefix positions within the applicable maximum length. The
oldest position with the required prefix balance gives the longest candidate
ending at the current index. Each position enters and leaves a queue once.

**Complexity:** `O(n)` time, `O(n)` space.
