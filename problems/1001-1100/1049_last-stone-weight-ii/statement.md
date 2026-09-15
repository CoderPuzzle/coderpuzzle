# Last Stone Weight II

## Description

You are given an array of integers `stones` where `stones[i]` is the weight of
the `i`th stone.

We are playing a game with the stones. On each turn, we choose **any** two
stones and smash them together. Suppose the stones have weights `x` and `y`
with `x <= y`. The result of this smash is:

- If `x == y`, both stones are destroyed, and
- If `x != y`, the stone of weight `x` is destroyed, and the stone of weight
  `y` has new weight `y - x`.

At the end of the game, there is at most one stone left.

Return the smallest possible weight of the left stone. If there are no stones
left, return `0`.

### Example 1

```text
Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation:
We can combine 2 and 4 to get 2, so the array converts to [2,7,1,8,1],
we can combine 7 and 8 to get 1, so the array converts to [2,1,1,1],
we can combine 2 and 1 to get 1, so the array converts to [1,1,1],
we can combine 1 and 1 to get 0, so the array converts to [1], then that's the optimal value.
```

### Example 2

```text
Input: stones = [31,26,33,21,40]
Output: 5
Explanation:
The total weight is 151. The subset [40, 33] sums to 73, and the remaining
stones [31, 26, 21] sum to 78, so smashing the two groups against each other
leaves 78 - 73 = 5, which is the best possible.
```

### Constraints

- `1 <= stones.length <= 30`
- `1 <= stones[i] <= 100`

### Follow-up

Can you reach the answer in `O(n * S)` time and `O(S)` space, where `S` is the
sum of all stone weights? Note that the total weight is at most `30 * 100`,
so this is cheap.

## Hints

### Hint 1

Track the sign each stone ends up with: every sequence of smashes leaves a
final stone whose weight is a sum of the form `±stones[0] ± stones[1] ...`,
and every such signed sum is reachable. So the answer is the smallest absolute
value of any signed sum.

### Hint 2

Split the stones into two groups — one taking the `+` signs, the other the `-`
signs. The final weight is the difference of the two group sums, so you want
a subset whose sum is as close as possible to half of the total.

### Hint 3

Subset sums up to `total / 2` can be tracked with a boolean table over sums
(a 0/1 knapsack): process stones one by one and mark newly reachable sums,
walking the table downward so each stone is used once.
