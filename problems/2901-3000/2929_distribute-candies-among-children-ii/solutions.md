# Solutions — Distribute Candies Among Children II

The same statement as its Easy sibling, but with n and limit up to 10⁶ the
answer reaches ~5 × 10¹¹ — beyond 32-bit range — and any loop over the
first child's candies is a million iterations. Counting without enumerating
removes both concerns at once.

## Inclusion-exclusion over the caps

Without any cap, distributing n identical candies to 3 distinct children is
the classic stars-and-bars count C(n + 2, 2). A cap enters through
inclusion-exclusion: forcing one particular child to hold at least
`limit + 1` candies leaves `n - (limit + 1)` candies to place freely, which
is C(n - (limit + 1) + 2, 2) ways per child, and the alternating sum over
children forced in pairs and in triplets repairs the overlaps. Terms whose
candy count drops below zero contribute nothing, because an empty split has
one way — the binomial convention in the code — while negative and small
arguments are simply mapped to zero.

Concretely the answer is
`C(n+2,2) − 3·C(n−limit+1,2) + 3·C(n−2·limit+1,2) − C(n−3·limit+1,2)`
with `C(m,2) = m(m−1)/2` for `m ≥ 2` and 0 otherwise. Each term is at most
1.5 × 10¹², comfortably inside every language's 64-bit accumulator (and
below 2⁵³, so JavaScript's numbers stay exact); the whole computation is a
fixed handful of arithmetic operations independent of n and limit.

**Complexity:** `O(1)` time, `O(1)` space.
