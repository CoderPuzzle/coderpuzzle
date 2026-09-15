# Kth Largest Element in an Array

## Description

Given an integer array `nums` and an integer `k`, return the `kth` largest
element in the array.

Note that it is the `kth` largest element in the sorted order, not the `kth`
distinct element.

### Example 1

```text
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
```

### Example 2

```text
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
```

### Constraints

- `1 <= k <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

Follow up: Can you solve it without sorting?

## Hints

### Hint 1

A min-heap of size k yields the kth largest element as its root after one pass over the array.

### Hint 2

Quickselect partitions around a pivot and recurses only into the side containing the answer, for O(n) average time.

### Hint 3

The kth largest is the element at index n - k of the sorted array; duplicates count toward the rank.
