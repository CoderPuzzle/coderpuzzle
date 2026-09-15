# Solutions — Count of Sub-Multisets With Bounded Sum

A sub-multiset never reorders anything: it is one multiplicity choice
per distinct value, with each choice in `0..cnt[v]` and every other
element of the array irrelevant to it. That turns the count into a
product of small per-value factors, which a knapsack over sums can apply
one value at a time.

## Group values and slide a bounded-knapsack window

Let `dp[x]` be the number of sub-multisets seen so far with sum `x`,
starting from `dp[0] = 1`. For a distinct value `v` with `c` copies, a
sub-multiset takes `k` of them for any `k` in `0..c`, so the row
transforms to `new[x] = dp[x] + dp[x-v] + ... + dp[x-cv]` — every sum
reads a fixed-width window into the previous row, so the whole row
updates in `O(r)`: walk each residue class mod `v` and slide the window
over that class's prefix sums (equivalently, run one forward unbounded
pass folding `dp[x-v]` into `dp[x]`, then subtract the over-count tail
`dp[x-(c+1)v]` from the right end inward). Value `0` is the degenerate
case: it changes no sum and simply multiplies every current count by
`c + 1`. Values above `r` are skipped (their sums can never land in
`[l, r]`), and the answer is the range sum `dp[l] + ... + dp[r]`.

The number of passes is the number of distinct values: since every
distinct positive value contributes at least 1 to the sum and the sum is
at most `2 * 10⁴`, there are at most about 200 of them, so the work is
roughly 200 rows of length `r`. Each stored count is reduced mod
`10⁹ + 7`, and the per-pass intermediates stay tiny — a sum of two
reduced counts, a product with at most `2 * 10⁴ + 1`, or a difference
corrected by adding the modulus once — so Java, C++, Go, and Rust run
in their 64-bit types, and JavaScript and TypeScript are exact in
`number` because every intermediate stays far below `2⁵³`.

**Complexity:** `O(n + r·√s)` time, `O(r)` space (`s` = sum of `nums`).
