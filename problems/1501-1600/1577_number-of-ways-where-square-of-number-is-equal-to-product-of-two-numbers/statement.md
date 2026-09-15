# Number of Ways Where Square of Number Is Equal to Product of Two Numbers

## Description

Given two integer arrays `nums1` and `nums2`, return the total number of
triplets that satisfy either of the following two rules.

- **Type 1:** a triplet `(i, j, k)` with `0 <= i < nums1.length` and
  `0 <= j < k < nums2.length` such that
  `nums1[i]^2 == nums2[j] * nums2[k]`.
- **Type 2:** a triplet `(i, j, k)` with `0 <= i < nums2.length` and
  `0 <= j < k < nums1.length` such that
  `nums2[i]^2 == nums1[j] * nums1[k]`.

Return the combined count of type 1 and type 2 triplets.

### Example 1

```text
Input: nums1 = [7,4], nums2 = [5,2,8,9]
Output: 1
Explanation: Type 1: (1, 1, 2). nums1[1]^2 = 4^2 = 16 = 2 * 8 = nums2[1] * nums2[2].
```

### Example 2

```text
Input: nums1 = [1,1], nums2 = [1,1,1]
Output: 9
Explanation:
Every possible triplet is valid, because 1^2 = 1 * 1.
Type 1 (nums1[i]^2 = nums2[j] * nums2[k]): (0,0,1), (0,0,2), (0,1,2),
(1,0,1), (1,0,2), (1,1,2).
Type 2 (nums2[i]^2 = nums1[j] * nums1[k]): (0,0,1), (1,0,1), (2,0,1).
```

### Example 3

```text
Input: nums1 = [7,7,8,3], nums2 = [1,2,9,7]
Output: 2
Explanation:
Type 1: (3, 0, 2). nums1[3]^2 = 3^2 = 9 = 1 * 9 = nums2[0] * nums2[2].
Type 2: (3, 0, 1). nums2[3]^2 = 7^2 = 49 = 7 * 7 = nums1[0] * nums1[1].
```

### Constraints

- `1 <= nums1.length, nums2.length <= 1000`
- `1 <= nums1[i], nums2[i] <= 10^5`

## Hints

### Hint 1

Precalculate the frequencies of the values in `nums1` and `nums2` rather
than the raw pairs — a hash map turns "how many pairs multiply to this
square" into a handful of lookups per candidate index.
