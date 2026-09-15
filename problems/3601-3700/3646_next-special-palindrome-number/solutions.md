# Solutions — Next Special Palindrome Number

## Mirrored halves over bitmask digit sets

A palindrome carries at most one digit an odd number of times, so a digit set
can only build a special number if it contains at most one odd member. Each
selected digit `k` then contributes `k / 2` copies to each half of the
palindrome; a lone odd member also owns the middle position. That parity rule
plus a bit mask over digits 1–9 enumerates every shape a special number can
have, and any set whose digits sum past 16 only produces palindromes of 17 or
more digits — far above anything reachable from `n <= 10¹⁵`.

For a fixed set the length is fixed too, and mirroring preserves order: two
halves that first differ at some position make palindromes that differ at the
same position, so walking the distinct permutations of the half multiset in
lexicographic order visits that set's palindromes in increasing numeric
order. An iterative next-permutation walk emits each arrangement exactly
once. The walk advances while the mirrored palindrome is at most `n`, and the
first palindrome past `n` is the best this set can offer — everything after
it mirrors to a larger number.

The answer is the smallest of those per-set successors. No storage or search
beyond one half-sized buffer is needed, and every folded value stays below
`10¹⁶`, comfortably inside signed 64-bit integers and exactly representable
doubles.

**Complexity:** `O(P + S)` time, where `P` counts the half arrangements
walked until each digit set's mirrored palindrome passes `n` (a few hundred
across the whole range) and `S = 512` is the number of digit-set masks;
`O(L)` space for the half buffer with `L <= 8`.
