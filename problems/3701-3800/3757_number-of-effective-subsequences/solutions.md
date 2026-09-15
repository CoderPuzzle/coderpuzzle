# Solutions — Number of Effective Subsequences

## Inclusion-exclusion over the total's bits

A removal strictly decreases the remaining OR exactly when at least one set
bit of the total disappears from it, and a bit disappears precisely when the
removed subsequence contains every element carrying that bit. So for each
non-empty set `S` of the total's bits, let `E(S)` be the subsequences that
remove all occurrences of every bit in `S`: such a subsequence must take
the `u(S)` elements carrying at least one bit of `S`, and nothing else is
constrained, so `|E(S)| = 2^(n − u(S))` where `u(S)` counts distinct
indices. The answer is the size of the union of all `E(S)`, which
inclusion-exclusion turns into one alternating sum over the `2^k − 1`
non-empty bit sets (`k ≤ 20`, since every value is below 2^20).

Each term needs only `n − u(S)` — the number of elements forced into no bit
of `S`. Compressing each element to its mask over the total's bits and
running one sum-over-subsets pass yields, for every `T`, how many elements'
masks lie inside `T`; plugging `T = complement(S)` into that table gives
`n − u(S)` directly, so the whole computation is a counting pass, an
O(k · 2^k) subset-sum sweep, and one pass over `2^k` terms with precomputed
powers of two.

The arithmetic stays exact everywhere: element counts are reduced modulo
10⁹ + 7 during the sweep, powers of two are precomputed under the same
modulus, and Python's always-nonnegative `%` pairs with a renormalizing
`(ans % MOD + MOD) % MOD` on the C-family side so the alternating signs land
identically in all seven languages.

**Complexity:** `O(n + k · 2^k)` time, `O(2^k)` space.
