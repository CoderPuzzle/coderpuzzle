# Minimum Number of Removals to Make Mountain Array

## Description

You may recall that an array `arr` is a mountain array if and only if:

- `arr.length >= 3`
- There exists some index `i` (0-indexed) with `0 < i < arr.length - 1` such that:
    - `arr[0] < arr[1] < ... < arr[i - 1] < arr[i]`
    - `arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`

Given an integer array `nums`, return the minimum number of elements to
remove to make `nums` a mountain array.

### Example 1

```text
Input: nums = [1,3,1]
Output: 0
Explanation: The array itself is a mountain array so we do not need to remove
any elements.
```

### Example 2

```text
Input: nums = [2,1,1,5,6,2,3,1]
Output: 3
Explanation: One solution is to remove the elements at indices 0, 1, and 5,
making the array nums = [1,5,6,3,1].
```

### Constraints

- `3 <= nums.length <= 1000`
- `1 <= nums[i] <= 10^9`
- It is guaranteed that you can make a mountain array out of `nums`.

## Hints

### Hint 1

Think in the opposite direction: instead of the minimum number of elements to remove, find the maximum-length mountain subsequence.

### Hint 2

This is close to the longest increasing subsequence: for each index compute the LIS ending there and the LIS starting there (reading right to left).

### Hint 3

A valid peak must have a strictly increasing run of length at least 2 on the left and a strictly decreasing run of length at least 2 on the right.
