# Non-decreasing Subsequences

## Description

Given an integer array `nums`, return all the different possible non-decreasing
subsequences of the given array with at least two elements. You may return the
answer in any order.

For a deterministic answer, this judge pins the output to sorted order: the
sequences are listed in ascending lexicographic order — compared element by
element, with a sequence sorting before any of its own extensions. Example 1
lists its output in exactly this order.

### Example 1

```text
Input: nums = [4,6,7,7]
Output: [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
```

### Example 2

```text
Input: nums = [4,4,3,2,1]
Output: [[4,4]]
```

### Constraints

- `1 <= nums.length <= 15`
- `-100 <= nums[i] <= 100`
