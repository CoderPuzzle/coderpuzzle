# Solutions — Longest Strictly Increasing Subsequence With Non-Zero Bitwise AND

## Per-bit filter with binary-search LIS

The bitwise AND of several numbers is non-zero exactly when at least one
bit is set in every one of them. So a valid subsequence must live entirely
inside, for some bit `b`, the set of elements that carry bit `b` — and
conversely, any strictly increasing subsequence drawn from those elements
has bit `b` set across its whole AND. Filtering `nums` down to the
elements with bit `b` set (order preserved) and computing the plain
longest strictly increasing subsequence on that filtered sequence
therefore covers every candidate for bit `b`; taking the maximum over all
bits is exact. When every element is 0 no bit ever survives the filter,
and the answer is 0, which the maximum over an empty set of candidates
returns naturally.

The LIS itself uses the patience-tails technique: `tails` holds the
smallest possible tail of a strictly increasing subsequence of each
length, and each incoming value `x` binary-searches for the first tail
`>= x`, either replacing it (equal tails never extend anything, since the
subsequence must be strictly increasing) or appending when `x` is larger
than them all. Only the bits up to the maximum element's bit length can
matter — values are at most `10⁹ < 2³⁰`, so at most 30 filters run, and
each element is examined once per filter.

Nothing beyond the input values is ever stored or computed: the tails are
input elements themselves, and the answer is a length of at most `10⁵`.
Fixed-width languages therefore carry everything in 32-bit integers, and
in JavaScript every `x >> b` on a value below `2³⁰` is an exact integer
shift with all comparisons exact far inside `2⁵³`.

**Complexity:** `O(30 · n log n)` time, `O(n)` space.
