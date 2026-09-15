# Solutions — Count the Number of Square-Free Subsets

## Bitmask DP over Prime Factors

A product is square-free exactly when no prime divides it twice, so a subset is square-free iff the prime-factor sets of its elements are pairwise disjoint. Since values are at most 30, only the ten primes 2..29 can appear, and each usable value compresses into a 10-bit mask of its prime factors. Values divisible by a prime square (4, 8, 9, 12, ...) have no valid mask and can never appear in any square-free subset — they are discarded outright.

The DP runs over _distinct values_ rather than array positions: `dp[mask]` counts the ways to choose a set of values (at most one copy of each distinct value) whose combined prime mask is exactly `mask`, starting from `dp[0] = 1`. For each distinct square-free value `v` with mask `m` and multiplicity `cnt`, every prior state `s` with `s & m == 0` can absorb one copy of `v` in `cnt` ways (any of the identical array positions), transitioning to `s | m`. Processing each value against a copied layer keeps transitions from using `v` twice in one step. Duplicate values interact correctly because choosing at most one copy is forced by the per-value transition.

After the loop, `sum(dp)` counts all subsets of values > 1 including the empty set. The `1`s are handled by the multiplication `* 2^ones`: each of the `ones` copies of 1 is independently includable or not, and 1 contributes no primes so it never breaks square-freeness. Finally the empty subset is subtracted before returning, leaving exactly the non-empty square-free subsets, taken modulo 10^9 + 7. With at most 29 distinct values above 1 and 1024 masks, the DP layer cost is a small constant next to reading the input.

**Complexity:** `O(n + 29 · 2¹⁰)` time, `O(2¹⁰)` space.
