# Subsets

## Description

Given an integer array `nums` of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the subsets in the order the examples
show: each subset stands for a bitmask over the positions of `nums`, and the list counts from all
bits clear (`[]`) up to all bits set (the whole array). Bit `i` set means `nums[i]` is in the
subset, and each subset keeps its elements in the order they appear in `nums`.

### Example 1

```text
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

### Example 2

```text
Input: nums = [0]
Output: [[],[0]]
```

### Constraints

- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`
- All the numbers of `nums` are unique.
