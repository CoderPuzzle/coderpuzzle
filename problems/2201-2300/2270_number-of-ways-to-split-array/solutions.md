# Solutions — Number of Ways to Split Array

## Rolling prefix sum

A split is valid exactly when the sum of the left part is at least the sum of
the right part. The right part's sum is never recomputed from scratch: once
the total is known, the right half is just `total - prefix`, so a single pass
that grows `prefix` by one element per step can decide every split in
constant time each. Only indices `0 <= i < n - 1` are considered, because the
statement requires at least one element to remain on the right.

The comparison itself is exact — nothing is rounded or averaged — so the
answer is a simple count. One subtlety is the width of the sums: with up to
`10⁵` elements each bounded by `±10⁵` in absolute value, a prefix or the
total can reach `±10¹⁰`, which overflows a 32-bit integer. The C++, Java,
Go, and Rust solutions therefore use their 64-bit integer type for `prefix`
and `total`; JavaScript's `Number` is exact for every integer below `2⁵³`
(≈ `9 × 10¹⁵`), which comfortably covers `±10¹⁰`, so it needs no special
handling. Python integers are unbounded.

The scan touches each element once, so an array of length `n` is decided with
one addition and one comparison per position after a single pass to compute
the total.

**Complexity:** `O(n)` time, `O(1)` space.
