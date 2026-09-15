# Longest Balanced Subarray I

## Description

You are given an integer array `nums`.

A subarray is called **balanced** when the number of distinct even values in
it equals the number of distinct odd values in it. Each value counts once per
subarray, no matter how many times it repeats there: `[2, 3, 2]` holds one
distinct even value (`2`) and one distinct odd value (`3`), so it is balanced.

Return the length of the longest balanced subarray. If no balanced subarray
exists, return `0`.

### Example 1

```text
Input: nums = [2,5,4,3]
Output: 4
Explanation: The whole array is balanced. It has two distinct even values,
[2,4], and two distinct odd values, [3,5].
```

### Example 2

```text
Input: nums = [3,2,2,5,4]
Output: 5
Explanation: The whole array is balanced. It has two distinct even values,
[2,4], and two distinct odd values, [3,5].
```

### Example 3

```text
Input: nums = [1,2,3,2]
Output: 3
Explanation: The longest balanced subarray is [2,3,2]. It has one distinct
even value, [2], and one distinct odd value, [3]; no longer subarray is
balanced.
```

### Constraints

- `1 <= nums.length <= 1500`
- `1 <= nums[i] <= 10⁵`

## Hints

### Hint 1

Use brute force.

### Hint 2

Try every subarray and use a map/set data structure to track the distinct even and odd numbers.
