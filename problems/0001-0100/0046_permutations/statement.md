# Permutations

## Description

Given an array `nums` of distinct integers, return all the possible permutations.

Return the permutations in the order the examples show: the list is sorted in ascending lexicographic order, each permutation compared element by element. Consecutive permutations therefore share their leading elements.

### Example 1

```text
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

### Example 2

```text
Input: nums = [0,1]
Output: [[0,1],[1,0]]
```

### Example 3

```text
Input: nums = [1]
Output: [[1]]
```

### Constraints

- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- All the integers of `nums` are unique.
