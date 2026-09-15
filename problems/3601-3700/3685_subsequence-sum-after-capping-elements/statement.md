# Subsequence Sum After Capping Elements

## Description

You are given an integer array `nums` of size `n` and a positive integer
`k`.

An array **capped by `x`** is obtained by replacing every element `nums[i]`
with `min(nums[i], x)`. Elements already at or below `x` keep their values;
every element strictly above `x` becomes exactly `x`.

For each integer `x` from `1` to `n`, decide whether it is possible to
choose a subsequence of the array capped by `x` whose elements sum to
exactly `k`.

Return a 0-indexed boolean array `answer` of size `n`, where `answer[i]` is
the decision taken using `x = i + 1`.

### Example 1

```text
Input: nums = [4,3,2,4], k = 5
Output: [false,false,true,true]
Explanation:
For x = 1, the capped array is [1,1,1,1]. Possible sums are 1 through 4,
so 5 is impossible.
For x = 2, the capped array is [2,2,2,2]. Possible sums are the even
values 2 through 8, so 5 is impossible.
For x = 3, the capped array is [3,3,2,3]. The subsequence [2,3] sums
to 5, so it is possible.
For x = 4, the capped array is [4,3,2,4]. The subsequence [3,2] sums
to 5, so it is possible.
```

### Example 2

```text
Input: nums = [1,2,3,4,5], k = 3
Output: [true,true,true,true,true]
Explanation:
For every value of x, it is always possible to select a subsequence from
the capped array that sums exactly to 3.
```

### Constraints

- `1 <= n == nums.length <= 4000`
- `1 <= nums[i] <= n`
- `1 <= k <= 4000`

## Hints

### Hint 1

Sort the array `nums` in descending order.

### Hint 2

Build a knapsack DP table `dp[idx][sum]` where `dp[idx][sum]` is true if
and only if there exists a subsequence of `nums[idx]` through the end that
sums to `sum`.

### Hint 3

Observe that capping all values above `x` to `x` in a sorted array is
equivalent to taking the first `t` elements (those originally greater than
`x`) and treating each as `x`; precompute which multiples of `x` up to
`t * x` are selectable.

### Hint 4

For each cap value `x`, let `t` be the number of elements originally
greater than `x`. Iterate over all sums `s` with `dp[t][s]` true and all
counts `m` from `0` to `t`; if some pair satisfies `s + m * x == k`, set
the answer for `x` to true, otherwise it remains false.
