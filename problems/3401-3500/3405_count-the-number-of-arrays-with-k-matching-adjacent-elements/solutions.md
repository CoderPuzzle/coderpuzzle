# Solutions — Count the Number of Arrays with K Matching Adjacent Elements

## Closed-Form Counting with Modular Factorials

An array is determined by one independent decision per position, once the positions of the equal-adjacency pairs are fixed. Choose the first element freely (`m` options). Among the remaining `n - 1` adjacent slots, choose which `k` satisfy `arr[i-1] == arr[i]` — those slots have exactly 1 choice (copy the previous value) — while each of the other `n - 1 - k` slots must differ from its predecessor, giving `m - 1` choices apiece. Distinct choices always produce distinct arrays, since the equality pattern is recoverable from the array itself, so the count is exactly `m · C(n-1, k) · (m-1)^(n-1-k)`.

The binomial coefficient is evaluated under the modulus `10⁹ + 7` using factorials and inverse factorials: precompute `fact[0..n]`, invert `fact[n]` once with Fermat's little theorem (`pow(fact[n], MOD-2, MOD)`, valid since the modulus is prime), then walk backwards to fill `inv_fact`. This yields `C(a, b)` as a product of three modular values, with out-of-range `b` mapped to zero.

Two degenerate families are absorbed by the formula rather than special-cased: `k = 0` gives `m · (m-1)^(n-1)` (strictly alternating-style arrays), and `k = n - 1` gives `C(n-1, n-1) = 1` family scaled by `m` (constant arrays). `n = 1` has no adjacent pairs, so only `k = 0` is valid and the formula returns `m`, matching the constraints.

Edge cases worth noting: `m = 1` forces every element equal, so the answer is 1 exactly when `k = n - 1` (the `(m-1)^0 = 1` term keeps the formula consistent, while `n - 1 - k > 0` makes `(m-1)^{...}` vanish); all exponentiations use fast modular power.

**Complexity:** `O(n)` time, `O(n)` space.
