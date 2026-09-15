# Minimum Index Sum of Common Elements

## Description

You are given two integer arrays `nums1` and `nums2`, both of length `n`.

A pair of indices `(i, j)` is called good when `nums1[i] == nums2[j]`.

Return the smallest value of `i + j` over all good pairs, or `-1` if no good
pair exists.

### Example 1

```text
Input: nums1 = [3,2,1], nums2 = [1,3,1]
Output: 1
Explanation: The common elements are 1 and 3. For 3, indices [i, j] = [0, 1]
give an index sum of i + j = 1. For 1, indices [i, j] = [2, 0] give an index
sum of i + j = 2. The minimum index sum is 1.
```

### Example 2

```text
Input: nums1 = [5,1,2], nums2 = [2,1,3]
Output: 2
Explanation: The common elements are 1 and 2. For 1, indices [i, j] = [1, 1]
give an index sum of i + j = 2. For 2, indices [i, j] = [2, 0] give an index
sum of i + j = 2. Both pairs tie at 2, and that tie is the minimum.
```

### Example 3

```text
Input: nums1 = [6,4], nums2 = [7,8]
Output: -1
Explanation: The two arrays share no common elements, so the output is -1.
```

### Constraints

- `1 <= nums1.length == nums2.length <= 10⁵`
- `-10⁵ <= nums1[i], nums2[i] <= 10⁵`

## Hints

### Hint 1

Build a hash map `pos1` that stores, for each value in `nums1`, the smallest index where it appears.

### Hint 2

Iterate through `nums2`. For each index `j`, if `nums2[j]` exists in `pos1`, compute `pos1[nums2[j]] + j`.

### Hint 3

Track the minimum index sum across all such matches.

### Hint 4

If no common element is found, return `-1`.
