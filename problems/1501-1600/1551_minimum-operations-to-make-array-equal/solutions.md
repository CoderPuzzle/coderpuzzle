# Solutions — Minimum Operations to Make Array Equal

## Closed-form deviation sum

The array `[1, 3, 5, ..., 2n - 1]` is an arithmetic sequence, so its mean
is always `n`: the sum of the first `n` odd numbers is `n²`, and `n² / n
= n`. Every operation moves exactly one unit from some `arr[x]` to some
`arr[y]`, so it can only ever shrink the total absolute deviation from
the target by `2` — one unit off the largest surplus, one unit onto the
largest deficit. The minimum number of operations to reach an all-`n`
array is therefore `(Σ |arr[i] - n|) / 2`.

Because the sequence is symmetric around `n`, the elements below and
above the target contribute equal shares of that sum, so it is enough to
sum the deficits in the lower half and that sum already equals the
answer. Writing out `Σ |arr[i] - n|` for `i` from `0` to `n - 1` and
dividing by `2` collapses to the closed form `⌊n² / 4⌋`: for even `n`
this is exactly `(n / 2)²`, and for odd `n` the middle element sits
exactly on the target and contributes nothing, leaving
`((n - 1) / 2) · ((n + 1) / 2)`, which is the same value as integer
division of `n²` by `4` truncates to. The implementation multiplies `n`
by itself in a 64-bit accumulator before dividing, so the intermediate
product never risks overflow even near the input's upper bound.

**Complexity:** `O(1)` time, `O(1)` space.
