# Single Element in a Sorted Array

## Description

You are given a sorted array consisting of only integers where every element
appears exactly twice, except for one element which appears exactly once.

Return the single element that appears only once.

Your solution must run in `O(log n)` time and `O(1)` space.

### Example 1

```text
Input: nums = [1,1,2,3,3,4,4,8,8]
Output: 2
```

### Example 2

```text
Input: nums = [3,3,7,7,10,11,11]
Output: 10
```

### Constraints

- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`

## Hints

### Hint 1

Before the single element, every pair starts at an even index; after it, every pair starts at an odd index.

### Hint 2

Binary search on even indices: if nums[mid] == nums[mid + 1], the single element lies to the right; otherwise it lies at mid or to the left.

### Hint 3

Use lo = 0, hi = n - 1 and shrink until lo == hi; nums[lo] is the answer.
