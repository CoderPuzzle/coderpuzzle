# Solutions — Find Nth Smallest Integer With K One Bits

The candidates are the positive integers with exactly `k` set bits, listed in
increasing order, and the task is to name entry `n` of that list. The answer
can sit anywhere below 2⁵⁰, so scanning numbers one by one is hopeless — but
the list's structure is pure combinatorics, and binomial counts locate the nth
element directly.

## Binomial Unranking, MSB to LSB

Group the candidates by bit length. A length-`L` number with exactly `k` ones
is a leading 1 plus `k − 1` ones spread over `L − 1` free positions, so there
are `C(L−1, k−1)` of them, and the hockey-stick identity collapses the count
of candidates with length at most `L` to exactly `C(L, k)`. Walking `L` upward
from `k` until that cumulative count first reaches `n` fixes the answer's bit
length; the leftover `r = n − C(L−1, k)` is the rank inside the length-`L`
block. The block is then unranked from its most significant bit down: placing
0 at position `p` leaves `C(p, need)` completions, all smaller than any
completion with a 1 there, so whenever `r` exceeds that block the bit is set,
`r` and `need` step down, and otherwise the position stays 0. A 51 × 51 rows
of Pascal's triangle supplies every binomial; its largest entry `C(50, 25) ≈
1.26 × 10¹⁴` never grows past 64-bit range.

Every value here is bounded by the statement's cap, and each language must
respect it. The answer stays below 2⁵⁰ and the binomials below 2×10¹⁴, so
Java `long`, C++ `long long` (with `1LL` shifts), Go `int64`, and Rust `i64`
carry everything natively — 2⁵⁰ overflows a 32-bit int long before it
troubles any of them — and Python's integers are unbounded outright. In
JavaScript and TypeScript every value is below 2⁵³, so a `Number` holds each
one exactly; but bitwise operators there coerce their operands to 32 bits and
would silently corrupt anything past 2³¹, so the solutions set bits by adding
exact powers of two (`2 ** p`) instead of OR-ing. Both loops run at most ~100
steps and the triangle is fixed-size, so nothing recurses and no stack is
consumed.

**Complexity:** `O(1)` time, `O(1)` space.
