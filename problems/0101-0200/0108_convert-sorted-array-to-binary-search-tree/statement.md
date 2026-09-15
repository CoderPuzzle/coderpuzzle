# Convert Sorted Array to Binary Search Tree

## Description

Given an integer array `nums` where the elements are sorted in ascending order, convert it to a
height-balanced binary search tree.

Several height-balanced BSTs can be built from the same array, but this judge compares the returned
tree exactly, so the build must be deterministic. For each sorted segment, the root of its subtree
is the middle element — of two middle elements in an even-length segment, take the **second**. The
elements before the middle become the left subtree, the elements after it the right subtree.

### Example 1

![diagram](figures/108-1.svg)

```text
Input: nums = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: 0 is the middle of the five values. The left segment [-10,-3] takes -3 as root (the
second of its two middles) with -10 under it; the right segment [5,9] takes 9 as root with 5
under it.
```

![diagram](figures/108-2.svg)

### Example 2

![diagram](figures/108-3.svg)

```text
Input: nums = [1,3]
Output: [3,1]
Explanation: The segment has two middles, so 3, the second, becomes the root with 1 under it.
```

### Constraints

- `1 <= nums.length <= 10⁴`
- `-10⁴ <= nums[i] <= 10⁴`
- `nums` is sorted in a strictly increasing order.
