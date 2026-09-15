# Solutions — Count Substrings That Satisfy K-Constraint I

A substring meets the k-constraint as soon as one of its two character
counts stays within `k`, and with `n <= 50` there are at most 1275
substrings, so checking every one directly is both honest and instant here.

## Running counts over every left endpoint

Fix the left endpoint and extend the right end one character at a time,
keeping a running count of zeros; the ones are then just the current length
minus that count, so no second scan is ever needed. Each extension checks
`zeros <= k or ones <= k` in constant time and completes at most one new
substring, which makes the whole sweep a plain double loop over the `O(n²)`
left/right index pairs.

Every substring is visited exactly once — at the step where its right edge
arrives — so nothing is skipped or counted twice, and the OR means a
substring qualifies whenever either character is rare enough, not only when
both are. The answer never exceeds `n * (n + 1) / 2 = 1275` at these
bounds, comfortably inside a signed 32-bit integer in every language.

**Complexity:** `O(n²)` time (fine at these bounds), `O(1)` space.
