# Best Time to Buy and Sell Stock using Strategy

## Description

You are given two integer arrays, `prices` and `strategy`, of equal length
`n`. On day `i`, `prices[i]` is the stock's price and `strategy[i]` is the
planned trading action:

- `-1` buys one unit of the stock,
- `0` holds,
- `1` sells one unit.

There are no budget or inventory rules — every action stays feasible no
matter what happened on earlier days.

You are also given an even integer `k`. You may apply **at most one**
modification to `strategy`: choose exactly `k` consecutive elements and
overwrite them, setting the first `k / 2` to `0` (hold) and the remaining
`k / 2` to `1` (sell).

The profit of a strategy is the sum of `strategy[i] * prices[i]` over all
days. Return the maximum profit achievable after applying at most one
modification.

### Example 1

```text
Input: prices = [4,2,8], strategy = [-1,0,1], k = 2
Output: 10
Explanation: Keeping the plan earns (-1)*4 + 0*2 + 1*8 = 4. Overwriting the
window starting at day 0 turns it into [0,1,1], worth 0 + 2 + 8 = 10.
Overwriting the window starting at day 1 reproduces [-1,0,1], still worth 4,
so the best achievable profit is 10.
```

### Example 2

```text
Input: prices = [5,4,3], strategy = [1,1,0], k = 2
Output: 9
Explanation: The untouched plan already earns 5 + 4 + 0 = 9. Overwriting the
window starting at day 0 gives [0,1,0], worth 4; starting at day 1 gives
[1,0,1], worth 8. Neither beats 9, so the unmodified profit stands as the
answer.
```

### Constraints

- `2 <= prices.length == strategy.length <= 10⁵`
- `1 <= prices[i] <= 10⁵`
- `-1 <= strategy[i] <= 1`
- `2 <= k <= prices.length`
- `k` is even

## Hints

### Hint 1

Build prefix sums so any interval can be queried in constant time: one
running sum of `prices[i]`, one of `strategy[i] * prices[i]`. The second
running sum already contains the base profit.

### Hint 2

Evaluate every segment of length `k`: replacing it forfeits the segment's
current weighted sum and collects the price sum of its second half. The
answer is the base profit plus the best such delta — negative deltas are
ignored because applying no modification at all is allowed.
