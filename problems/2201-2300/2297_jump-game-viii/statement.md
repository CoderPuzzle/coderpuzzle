# Jump Game VIII

## Description

You are given a 0-indexed integer array `nums` of length `n`. You are initially
standing at index 0. You can jump from index `i` to index `j` where `i < j` if:

- `nums[i] <= nums[j]` and `nums[k] < nums[i]` for all indexes `k` in the range
  `i < k < j`, or
- `nums[i] > nums[j]` and `nums[k] >= nums[i]` for all indexes `k` in the range
  `i < k < j`.

You are also given an integer array `costs` of length `n`, where `costs[i]`
denotes the cost of jumping to index `i`. The cost of a path is the sum of
`costs[j]` over every index `j` you jump to.

Return the minimum cost to jump to the index `n - 1`.

### Example 1

```text
Input: nums = [3,2,4,4,1], costs = [3,7,6,4,2]
Output: 8
Explanation: You start at index 0. Jump to index 2 with a cost of costs[2] = 6, then jump to index 4 with a cost of costs[4] = 2. The total cost is 8. It can be proven that 8 is the minimum cost needed. Two other possible paths are 0 -> 1 -> 4 and 0 -> 2 -> 3 -> 4, with a total cost of 9 and 12, respectively.
```

### Example 2

```text
Input: nums = [0,1,2], costs = [1,1,1]
Output: 2
Explanation: You start at index 0. Jump to index 1 with a cost of costs[1] = 1, then jump to index 2 with a cost of costs[2] = 1. The total cost is 2. Note that you cannot jump directly from index 0 to index 2 because nums[0] <= nums[1].
```

### Constraints

- `1 <= n <= 10⁵`
- `n == nums.length == costs.length`
- `0 <= nums[i], costs[i] <= 10⁵`

### Follow-up

Can you solve the problem in `O(n)` time?

## Hints

### Hint 1

Look at where index `i` can jump: the first later index whose value is at
least `nums[i]`, and the first later index whose value is strictly smaller than
`nums[i]`. Convince yourself that these two indexes are the only possible jump
targets of `i`.

### Hint 2

Both "first later index" tables can be built in `O(n)` with monotonic stacks:
sweep the array left to right once popping indexes whose first greater-or-equal
value has arrived, and once popping indexes whose first strictly smaller value
has arrived.

### Hint 3

Let `dp[i]` be the minimum cost of getting to index `i`. Each index has at most
two outgoing jump edges, so the jump graph is a DAG with at most `2n` edges —
relax `dp` forward along those edges in increasing index order.
