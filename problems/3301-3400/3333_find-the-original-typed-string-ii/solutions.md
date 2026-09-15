# Solutions — Find the Original Typed String II

## Run-Length Compression with a Bounded-Knapsack Complement Count

An intended string is determined by how many characters each maximal run of equal letters stands for: a run of length `c` contributes between `1` and `c` intended characters, and runs are independent. The total number of intended strings is therefore the product of the run lengths modulo `10⁹ + 7`. To enforce the minimum length `k`, count the complement instead — the number of run-choice tuples whose total length is at most `k - 1` — and subtract it from the total.

The complement is a bounded knapsack over runs: `dp[j]` counts the ways to pick per-run lengths (each in `[1, c]`) summing exactly to `j < k`. A naive per-run transition over all `(j, chosen)` pairs would be quadratic in `k`; instead a prefix-sum sliding window makes each run `O(k)`: precompute `prefix[j]` of the old `dp`, then `ndp[j] = prefix[j] - prefix[max(0, j - c)]`, i.e. the number of ways whose last run contributed at most `c`. Summing `dp` after all runs gives the count of strings shorter than `k`.

One shortcut: if `k` is at most the number of runs `r`, every tuple already has length at least `r ≥ k`, so the answer is just the product — no DP needed. This also caps the DP's work, since the DP only runs when `k > r`.

Edge cases: a word of all identical letters is a single run (product = its length); `k = 1` always returns the product directly via the shortcut; the modulo is applied throughout so the final subtraction is reduced correctly even when the complement exceeds the modulus. With `r` runs over a word of length `n`, compression is `O(n)` and the knapsack is `O(r · k)`.

**Complexity:** `O(n + r · k)` time, `O(k)` space.
