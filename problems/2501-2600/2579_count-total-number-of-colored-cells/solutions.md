# Solutions — Count Total Number of Colored Cells

## Diamond-Layer Formula

Minute one plants a single cell, and each later minute adds the ring of
cells touching the current diamond at distance one — so after minute n
the blue region is a perfect diamond of Chebyshev radius n−1 around the
origin cell. The picture in the statement shows exactly this growth for
n = 1, 2, 3.

The hint asks for the closed form rather than a simulation. Ring k
(k = 1, …, n−1) contributes its four sides of length k minus shared
corners — precisely `4·k` new cells — and summing gives
`1 + 4·(0 + 1 + ⋯ + (n−1)) = 2n² − 2n + 1`. That quantity reaches
about `2·10¹⁰` at `n = 10⁵`, well past 32 bits: Java/C++/Go/Rust
evaluate it in 64-bit words (`long`/`int64`/`i64`), while
JavaScript/TypeScript Numbers remain exact because everything involved
stays far below `2⁵³`.

**Complexity:** `O(1)` time, `O(1)` space.
