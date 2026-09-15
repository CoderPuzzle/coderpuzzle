# Two Out of Three

## Description

Given three integer arrays `nums1`, `nums2`, and `nums3`, return a distinct
array containing all the values that are present in at least two out of the
three arrays. The values may mathematically be returned in any order. For
deterministic judging, return the distinct values in ascending order.

### Example 1

```text
Input: nums1 = [1,1,3,2], nums2 = [2,3], nums3 = [3]
Output: [2,3]
Explanation: The values that are present in at least two arrays are:
- 3, in all three arrays.
- 2, in nums1 and nums2.
```

### Example 2

```text
Input: nums1 = [3,1], nums2 = [2,3], nums3 = [1,2]
Output: [1,2,3]
Explanation: The values that are present in at least two arrays are:
- 2, in nums2 and nums3.
- 3, in nums1 and nums2.
- 1, in nums1 and nums3.
```

### Example 3

```text
Input: nums1 = [1,2,2], nums2 = [4,3,3], nums3 = [5]
Output: []
Explanation: No value is present in at least two arrays.
```

### Constraints

- `1 <= nums1.length, nums2.length, nums3.length <= 100`
- `1 <= nums1[i], nums2[j], nums3[k] <= 100`

## Hints

### Hint 1

What data structure can we use to help us quickly find whether an element belongs in an array?

### Hint 2

Can we count the frequencies of the elements in each array?
