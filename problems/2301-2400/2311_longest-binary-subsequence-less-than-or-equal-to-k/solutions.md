# Solutions — Longest Binary Subsequence Less Than or Equal to K

## Greedy scan from the right

A binary string's value reads from its right end: a character weighs
`2^(kept characters to its right)`, and that weight is fixed the moment
the character is accepted, because everything picked later only prepends
more significant digits. So scanning `s` right to left needs just two
numbers — `value`, the exact value of what has been kept, and `count`,
its length. Every '0' is kept unconditionally: prepending a zero digit
leaves `value` untouched and grows `count` by one, length for free. Each
'1' would add exactly `2^count`, so it is kept whenever
`value + 2^count <= k`.

This is optimal, and one invariant proves it. After any prefix of the
scan, compare the greedy pair `(value, count)` with those of **any** valid
subsequence `T` restricted to the scanned suffix, `(v, t)`: claim
`count >= t` and `value <= v + 2^count - 2^t`. Both start at equality, and
every branch preserves the claim using only the previous step: a zero
taken on either side doubles both power terms together (`2^c - 2^t >= 0`
once `c >= t`); when `T` accepts a '1' it pays exactly `2^t`, which
cancels the drop of its power term; when the greedy accepts a '1' costing
`2^count`, substituting the claimed bound on `value` gives
`value + 2^count <= v + 2^(count+1) - 2^t`, exactly the new right side.
At the end of the scan `T` ranges over all valid subsequences, so
`count` never trails any of them — and since each acceptance was checked
against `k`, the greedy's own string is valid and meets the bound. Zeros
keep flowing in even after `count` grows past the point where no
remaining '1' can fit (`2^count` alone exceeds `k`, and it only grows).

**Complexity:** `O(n)` time, `O(1)` space.
