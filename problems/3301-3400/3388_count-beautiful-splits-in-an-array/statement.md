# Count Beautiful Splits in an Array

## Description

You are given an array `nums`.

A split of the array `nums` is beautiful if `nums` can be split into three subarrays `nums1`, `nums2`, and `nums3` such that concatenating them in that order reconstructs `nums`, and either:

- `nums1` is a prefix of `nums2`, or
- `nums2` is a prefix of `nums3`.

Return the number of ways you can make such a split.

### Example 1

```text
Input: nums = [1,1,2,1]
Output: 2
Explanation: The beautiful splits are:
[1] + [1,2] + [1] and [1] + [1] + [2,1].
```

### Example 2

```text
Input: nums = [1,2,3,4]
Output: 0
Explanation: There are 0 beautiful splits.
```

### Constraints

- `1 <= nums.length <= 5000`
- `0 <= nums[i] <= 50`

## Hints

### Hint 1

A split is fully determined by the boundary indices: nums1 = nums[0:i], nums2 = nums[i:j], nums3 = nums[j:n] with 1 <= i < j < n.

### Hint 2

Precompute the longest common prefix of every pair of suffixes nums[i:] and nums[j:] so that a prefix-of comparison is an O(1) query.

### Hint 3

For each i, count the valid j: either nums1 is a prefix of nums2 (all j >= 2*i), plus every j where nums2 is a prefix of nums3.
