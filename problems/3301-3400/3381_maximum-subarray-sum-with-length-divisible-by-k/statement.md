# Maximum Subarray Sum With Length Divisible by K

## Description

You are given an array of integers `nums` and an integer `k`.

Return the maximum sum of a subarray of `nums`, such that the size of the subarray is divisible by `k`.

### Example 1

```text
Input: nums = [1,2], k = 1
Output: 3
Explanation: The subarray [1, 2] with sum 3 has length equal to 2 which is divisible by 1.
```

### Example 2

```text
Input: nums = [-1,-2,-3,-4,-5], k = 4
Output: -10
Explanation: The maximum sum subarray is [-1, -2, -3, -4] which has length equal to 4 which is divisible by 4.
```

### Example 3

```text
Input: nums = [-5,1,2,-3,4], k = 2
Output: 4
Explanation: The maximum sum subarray is [1, 2, -3, 4] which has length equal to 4 which is divisible by 2.
```

### Constraints

- `1 <= k <= nums.length <= 2 * 10⁵`
- `-10⁹ <= nums[i] <= 10⁹`

## Hints

### Hint 1

The length of a subarray is divisible by k, so its start and end indices share the same remainder modulo k.

### Hint 2

Maintain the minimum prefix sum ending at every possible index % k.

### Hint 3

For each position, a candidate subarray is the current prefix sum minus the smallest earlier prefix sum with the same remainder.
