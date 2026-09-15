# Maximize Subarray Sum After Removing All Occurrences of One Element

## Description

You are given an integer array `nums`.

You can do the following operation on the array at most once:

- Choose any integer `x` such that `nums` remains non-empty on removing all occurrences of `x`.
- Remove all occurrences of `x` from the array.

Return the maximum subarray sum across all possible resulting arrays.

### Example 1

```text
Input: nums = [-3,2,-2,-1,3,-2,3]
Output: 7
Explanation: We can have the following arrays after at most one operation:
  The original array is [-3, 2, -2, -1, 3, -2, 3]. The maximum subarray sum is 3 + (-2) + 3 = 4.
  Deleting all occurrences of x = -3 results in [2, -2, -1, 3, -2, 3]. The maximum subarray sum is 3 + (-2) + 3 = 4.
  Deleting all occurrences of x = -2 results in [-3, 2, -1, 3, 3]. The maximum subarray sum is 2 + (-1) + 3 + 3 = 7.
  Deleting all occurrences of x = -1 results in [-3, 2, -2, 3, -2, 3]. The maximum subarray sum is 3 + (-2) + 3 = 4.
  Deleting all occurrences of x = 3 results in [-3, 2, -2, -1, -2]. The maximum subarray sum is 2.
  The output is max(4, 4, 7, 4, 2) = 7.
```

### Example 2

```text
Input: nums = [1,2,3,4]
Output: 10
Explanation: It is optimal to not perform any operations.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `-10⁶ <= nums[i] <= 10⁶`

## Hints

### Hint 1

Each node of a segment tree should store the subarray sum, the maximum subarray sum, the maximum prefix sum, and the maximum suffix sum within the subarray defined by that node.

### Hint 2

Only deleting a negative value can improve the answer, so you only need to consider the negative values as candidates.
