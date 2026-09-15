# Jump Game VI

## Description

You are given a 0-indexed integer array `nums` and an integer `k`.

You are initially standing at index 0. In one move, you can jump at most `k`
steps forward without going outside the boundaries of the array. That is, you
can jump from index `i` to any index in the range
`[i + 1, min(n - 1, i + k)]` inclusive.

You want to reach the last index of the array (index `n - 1`). Your score is
the sum of all `nums[j]` for each index `j` you visited in the array.

Return the maximum score you can get.

### Example 1

```text
Input: nums = [1,-1,-2,4,-7,3], k = 2
Output: 7
Explanation: You can choose your jumps forming the subsequence [1,-1,4,3] (with indices [0,1,3,5]). The sum is 7.
```

### Example 2

```text
Input: nums = [10,-5,-2,4,0,3], k = 3
Output: 17
Explanation: You can choose your jumps forming the subsequence [10,4,3] (with indices [0,3,5]). The sum is 17.
```

### Example 3

```text
Input: nums = [1,-5,-20,4,-1,3,-6,-3], k = 2
Output: 0
Explanation: You can choose your jumps forming the subsequence [1,-20,3] (with indices [0,2,5]). The sum is 0.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= k <= 10⁵`
- `-10⁴ <= nums[i] <= 10⁴`

### Follow-up

Can you solve the problem in `O(n)` time?

## Hints

### Hint 1

Let `dp[i]` be the maximum score needed to reach index `i`. Then
`dp[i] = nums[i] + max(dp[i - k], ..., dp[i - 1])` — a direct evaluation of
this recurrence costs `O(n * k)`.

### Hint 2

The transition only needs the maximum dp value over a sliding window of fixed
width `k`, so an `O(n * k)` scan re-reads almost the same values at every
step. Aim to maintain that window maximum in `O(1)` amortized time per index.

### Hint 3

Keep a deque of indices whose dp values are strictly decreasing: pop indices
with smaller-or-equal dp values from the back before pushing index `i`, and
drop expired indices (older than `i - k`) from the front. The front of the
deque is always the predecessor that maximizes `dp[i]`.
