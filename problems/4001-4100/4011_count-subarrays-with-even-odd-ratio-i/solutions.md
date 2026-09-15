# Solutions — Count Subarrays With Even Odd Ratio I

## Counting scan from every left endpoint

Only the parity of each element matters, so the scan carries two counters instead of looking at values. Fix the left endpoint and extend the right endpoint one step at a time, maintaining `even`: how many even elements the window holds, and `odd`: how many odd elements. Every subarray `left..right` is visited exactly once with its exact counts, so each valid window contributes exactly one increment.

Validity needs both conditions from the statement. The odd-count requirement comes first: a window of all even elements has no odd count to divide by and is never valid, no matter how permissive `a / b` is — that is why `[2,2,2]` scores 0 in Example 3. When `odd >= 1`, comparing `even / odd <= a / b` by exact rational value is the same as comparing cross-products `b * even <= a * odd`, because multiplying both sides by the positive quantity `b * odd` never flips the inequality — pure integer arithmetic, no floating-point rounding. An `even` count of zero is fine: `0 / odd` is 0, which does not exceed any allowed ratio.

Both counters are at most `n <= 1000`, so the products fit comfortably in machine integers, and the answer is bounded by `n * (n + 1) / 2 = 500500`.

**Complexity:** `O(n²)` time, `O(1)` space.
