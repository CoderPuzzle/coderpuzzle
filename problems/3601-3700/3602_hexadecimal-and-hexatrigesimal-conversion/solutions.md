# Solutions — Hexadecimal and Hexatrigesimal Conversion

## Repeated division into a shared digit alphabet

Both requested representations come from the same primitive: write an
integer in base `b` using the digits `0-9` followed by uppercase letters.
That is exactly one 36-character alphabet, where base 16 simply stops at `F`
and base 36 runs through `Z`. The conversion loop is the classic
divide-and-collect: take `x % b` as the next digit, replace `x` with
`x / b`, and stop when `x` reaches zero. Because `n` is at least 1, both
`n²` and `n³` are at least 1 too, so the loop always emits at least one
digit and no zero special case is needed.

Digits are produced lowest-significance first, so the collected list is
reversed before joining. The two powers are computed in the language's
widest convenient integer type (`long`, `long long`, `i64` — or plain
numbers in the JS family, where `1000³ = 10⁹` sits far below the 2⁵³
exactness ceiling); concatenating the base-16 rendering of `n²` with the
base-36 rendering of `n³` in that order is the whole answer.

**Complexity:** `O(log n)` time (at most ~5 hex plus ~7 base-36 digits for
the largest `n`), `O(log n)` space for the digit buffers.
