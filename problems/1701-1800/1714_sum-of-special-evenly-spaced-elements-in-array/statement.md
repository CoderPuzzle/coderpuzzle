# Sum Of Special Evenly-Spaced Elements In Array

## Description

You are given a **0-indexed** integer array `nums` consisting of `n`
non-negative integers.

You are also given an array `queries`, where `queries[i] = [x_i, y_i]`. The
answer to the `i`-th query is the sum of all `nums[j]` where `x_i <= j < n`
and `(j - x_i)` is divisible by `y_i`.

Return an array `answer` where `answer.length == queries.length` and
`answer[i]` is the answer to the `i`-th query modulo `10⁹ + 7`.

### Example 1

```text
Input: nums = [0,1,2,3,4,5,6,7], queries = [[0,3],[5,1],[4,2]]
Output: [9,18,10]
Explanation: The answers of the queries are as follows:
1) The j indices that satisfy this query are 0, 3, and 6.
   nums[0] + nums[3] + nums[6] = 9
2) The j indices that satisfy this query are 5, 6, and 7.
   nums[5] + nums[6] + nums[7] = 18
3) The j indices that satisfy this query are 4 and 6.
   nums[4] + nums[6] = 10
```

### Example 2

```text
Input: nums = [100,200,101,201,102,202,103,203], queries = [[0,7]]
Output: [303]
Explanation: The j indices that satisfy this query are 0 and 7.
nums[0] + nums[7] = 100 + 203 = 303.
```

### Constraints

- `n == nums.length`
- `1 <= n <= 5 × 10⁴`
- `0 <= nums[i] <= 10⁹`
- `1 <= queries.length <= 1.5 × 10⁵`
- `0 <= x_i < n`
- `1 <= y_i <= 5 × 10⁴`

## Hints

### Hint 1

Think if y cannot be small. You can solve a query in `O(n/y)`, so if y is
large enough, it won't be a problem.

### Hint 2

If y is small, like less than `B`, you can preprocess the answers for all
such ys in `O(n * B)`, then answer each such query in `O(1)`.

### Hint 3

As you might have already guessed, the optimal value for `B` is ~sqrt(n).
