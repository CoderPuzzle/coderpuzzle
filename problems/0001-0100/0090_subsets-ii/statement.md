# Subsets II

## Description

Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the subsets in the order the examples show:
the whole list is sorted in ascending lexicographic order, `[]` first, and each subset keeps its own
elements in ascending order.

### Example 1

```text
Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
```

### Example 2

```text
Input: nums = [0]
Output: [[],[0]]
```

### Constraints

- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`
