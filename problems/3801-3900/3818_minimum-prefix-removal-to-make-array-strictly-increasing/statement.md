# Minimum Prefix Removal to Make Array Strictly Increasing

## Description

You are given an integer array nums.

You need to remove exactly one prefix (possibly empty) from nums.

Return an integer denoting the minimum length of the removed prefix such
that the remaining array is strictly increasing.

### Example 1

```text
Input: nums = [1,-1,2,3,3,4,5]
Output: 4
Explanation: Removing the prefix = [1, -1, 2, 3] leaves the remaining
array [3, 4, 5] which is strictly increasing.
```

### Example 2

```text
Input: nums = [4,3,-2,-5]
Output: 3
Explanation: Removing the prefix = [4, 3, -2] leaves the remaining array
[-5] which is strictly increasing.
```

### Example 3

```text
Input: nums = [1,2,3,4]
Output: 0
Explanation: The array nums = [1, 2, 3, 4] is already strictly increasing
so removing an empty prefix is sufficient.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `-10⁹ <= nums[i] <= 10⁹`

## Hints

### Hint 1

Find the first index i from the right such that nums[i] >= nums[i + 1].

### Hint 2

If such an index exists, the answer is i + 1; otherwise, the array is
already strictly increasing.
