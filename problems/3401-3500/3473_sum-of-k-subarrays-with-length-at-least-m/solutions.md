# Solutions — Sum of K Subarrays With Length at Least M

## Layered DP with a Running Best Transition

Let `prev[j]` be the maximum total using `i - 1` subarrays within the first `j` elements (row 0 is all zeros — zero subarrays cost nothing). To build the next layer, a subarray closing at `j` opens at some `t <= j - m` (the length-at-least-`m` rule) and contributes `prefix[j] - prefix[t]`, so the transition is `cur[j] = max(cur[j-1], prefix[j] + max over t <= j - m of (prev[t] - prefix[t]))`. The inner maximum is over a growing prefix of `t`, and `j - m` only increases with `j`, so a single running variable `best` absorbs each new `t = j - m` as `j` advances, making each row linear instead of quadratic.

`cur[j-1]` appearing inside the max implements "the i-th subarray may end before `j`": elements after the last chosen subarray are simply unused, which is valid because only exactly `k` non-overlapping subarrays are required, not a cover of the array. Negative sums are fine — the problem forces exactly `k` subarrays, and every position of `cur` beyond the reachability threshold `i * m` gets a genuine value, while earlier positions stay `-inf` and are naturally excluded by the max chain when they cannot host `i` subarrays yet.

Prefix sums of `nums` make any subarray sum an `O(1)` lookup, and only two rows are ever alive (`prev` and `cur`), each of length `n + 1`. After `k` layers the answer is `prev[n]`: the best total of exactly `k` subarrays within the whole array.

Edge cases: `k = n / m` with `m` small forces essentially every element into some subarray (example 2's all-negative case), overlapping choices are structurally impossible because each transition consumes a disjoint `[t, j)` block, and `m > 1` just shifts when candidates `t` become available via the `t >= 0` guard.

**Complexity:** `O(n * k)` time, `O(n)` space.
