# Solutions — Ways to Express an Integer as Sum of Powers

## 0/1 knapsack over the distinct powers

Because `i^x` grows strictly with `i`, the powers available as summands —
`p = i^x` for every `i` with `p <= n` — form an increasing list of distinct
values, and a set of unique integers is nothing but a choice of which entries
of that list to take, each at most once. Counting representations of `n`
therefore means counting subsets of the list that sum to `n`, which is the
counting knapsack. Let `dp[t]` denote the number of subsets among the powers
processed so far that sum to `t`; after the full pass, `dp[n]` is the answer
and `dp[0] = 1` seeds the one empty set.

Adding a new power `p` splits every subset into those using it and those not,
so the update is `dp[t] += dp[t - p]` — provided `dp[t - p]` still holds the
count from _before_ `p` existed. Walking `t` from `n` down to `p` guarantees
exactly that: each entry is read at its pre-`p` value before being
overwritten, so no subset can take `p` twice. Iterating `t` upward instead
would read freshly written entries and silently count multisets — the
coin-change semantics this problem deliberately excludes. Every addition is
taken modulo `10⁹ + 7`; intermediate totals stay far below the modulus times
itself, so fixed-width ports reduce into 64-bit registers on the way.

Two edge regimes fall out of the same table. `n = 1` has the single
representation `n = 1^x` for every `x`. And whenever `2^x > n` the candidate
list degenerates to just the power `1`, which can be used once — so the
answer is then `1` precisely for `n = 1` and `0` otherwise.

**Complexity:** `O(n^(1 + 1/x))` time, `O(n)` space.
