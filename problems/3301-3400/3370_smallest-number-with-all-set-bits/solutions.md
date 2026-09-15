# Solutions — Smallest Number With All Set Bits

## Strictly greater power of two, minus one

The numbers whose binary representation contains only set bits are exactly
`2^t - 1` — one per bit length `t`: 1, 3, 7, 15, … So the answer must be the
smallest member of that ladder reaching at least `n`. Given `n`, take `L` as
its bit length (the position of the strictly greater power of two, as hint 1
suggests). Then `n < 2^L`, so the candidate `2^L - 1` is all-ones and satisfies
`x >= n`. Nothing smaller qualifies: any all-ones number with fewer bits is at
most `2^(L-1) - 1`, which is strictly below `2^(L-1) <= n`, and the only
L-bit all-ones number is `2^L - 1` itself.

Each language reads `L` in constant time from its word-level leading-zero
count (`bit_length`, `clz32`, `numberOfLeadingZeros`, `__builtin_clz`,
`leading_zeros`) or, in Go, from a ten-iteration shift loop that keeps the
fragment import-free. Every value involved is bounded by `n <= 1000`, so the
result never exceeds 1023 and stays comfortably inside 32-bit range in all
seven languages — the 64-bit law is nowhere near being engaged.

**Complexity:** `O(1)` time (bit length of `n <= 1000` is at most 10), `O(1)`
space.
