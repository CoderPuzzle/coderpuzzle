# Find All Duplicates in an Array

## Description

Given an integer array `nums` of length `n` where all the integers of `nums`
are in the range `[1, n]` and each integer appears at most twice, return an
array of all the integers that appears twice.

You must write an algorithm that runs in `O(n)` time and uses only constant
auxiliary space, excluding the space needed to store the output.

On LeetCode the output may come back in any order; this judge compares arrays
exactly, so return the duplicates sorted in ascending order — every answer the
original accepts is the same set as this one.

### Example 1

```text
Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]
```

### Example 2

```text
Input: nums = [1,1,2]
Output: [1]
```

### Example 3

```text
Input: nums = [1]
Output: []
```

### Constraints

- `n == nums.length`
- `1 <= n <= 10⁵`
- `1 <= nums[i] <= n`
- Each element in `nums` appears once or twice.
