# Shortest Subarray With OR at Least K II

## Description

You are given an array `nums` of non-negative integers and an integer `k`.

An array is called special if the bitwise OR of all of its elements is at
least `k`.

Return the length of the shortest special non-empty subarray of `nums`, or
return -1 if no special subarray exists.

### Example 1

```text
Input: nums = [1,2,3], k = 2
Output: 1
Explanation: The subarray [3] has OR value of 3. Hence, we return 1.
```

### Example 2

```text
Input: nums = [2,1,8], k = 10
Output: 3
Explanation: The subarray [2,1,8] has OR value of 11. Hence, we return 3.
```

### Example 3

```text
Input: nums = [1,2], k = 0
Output: 1
Explanation: The subarray [1] has OR value of 1. Hence, we return 1.
```

### Constraints

- `1 <= nums.length <= 2 * 10⁵`
- `0 <= nums[i] <= 10⁹`
- `0 <= k <= 10⁹`

## Hints

### Hint 1

For each nums[i], we can maintain each subarray’s bitwise OR result ending
with it.

### Hint 2

The property of bitwise OR is that it never unsets any bits and only sets
new bits.

### Hint 3

So the number of different results for each nums[i] is at most the number
of bits 32.
