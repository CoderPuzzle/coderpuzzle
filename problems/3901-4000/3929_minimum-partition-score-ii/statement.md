# Minimum Partition Score II

## Description

You are given an integer array `nums` and an integer `k`.

Your task is to partition `nums` into exactly `k` subarrays and return an
integer denoting the minimum possible score among all valid partitions.

The score of a partition is the sum of the values of all its subarrays.

The value of a subarray is defined as `sumArr * (sumArr + 1) / 2`, where
`sumArr` is the sum of its elements.

### Example 1

```text
Input: nums = [5,1,2,1], k = 2
Output: 25
Explanation:
    We must partition the array into k = 2 subarrays. One optimal partition is
    [5] and [1, 2, 1].
    The first subarray has sum = 5 and value = 5 * 6 / 2 = 15.
    The second subarray has sum = 1 + 2 + 1 = 4 and value = 4 * 5 / 2 = 10.
    The score of this partition is 15 + 10 = 25, which is the minimum possible
    score.
```

### Example 2

```text
Input: nums = [1,2,3,4], k = 1
Output: 55
Explanation:
    Since we must partition the array into k = 1 subarray, all elements belong
    to the same subarray: [1, 2, 3, 4].
    This subarray has sum = 1 + 2 + 3 + 4 = 10 and value = 10 * 11 / 2 = 55.
    The score of this partition is 55, which is the minimum possible score.
```

### Example 3

```text
Input: nums = [1,1,1], k = 3
Output: 3
Explanation:
    We must partition the array into k = 3 subarrays. The only valid partition
    is [1], [1], [1].
    Each subarray has sum = 1 and value = 1 * 2 / 2 = 1.
    The score of this partition is 1 + 1 + 1 = 3, which is the minimum possible
    score.
```

### Constraints

- `1 <= nums.length <= 5 * 10⁴`
- `1 <= nums[i] <= 10³`
- `1 <= k <= nums.length`

## Hints

### Hint 1

Use prefix sums to rewrite the value of any subarray in `O(1)`.

### Hint 2

Consider DP transitions of the form:
`dp[i] = min(dp[j] + cost(j + 1, i))`. Expand the cost formula
algebraically. The transition can be rewritten as a minimum over linear
functions.

### Hint 3

Instead of DP on the number of partitions, add a penalty for creating a
subarray and binary search that penalty.
