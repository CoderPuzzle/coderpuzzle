# Median of Two Sorted Arrays

## Description

Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively,
return the median of the two sorted arrays.

The overall run time complexity should be `O(log (m+n))`.

### Example 1

```text
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
```

### Example 2

```text
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
```

### Constraints

- `nums1.length == m`
- `nums2.length == n`
- `0 <= m <= 1000`
- `0 <= n <= 1000`
- `1 <= m + n <= 2000`
- `-10^6 <= nums1[i], nums2[i] <= 10^6`

## Hints

### Hint 1

Binary search on how many elements the shorter array contributes to the left half of the merged ordering.

### Hint 2

Once that cut is chosen, the cut in the longer array is forced: the left half always holds (m + n + 1) / 2 elements in total.

### Hint 3

The partition is valid when every element on the left is <= every element on the right; use -infinity/+infinity sentinels for cuts at the array edges.

### Hint 4

For an odd total the median is the maximum of the left parts; for an even total average the two middle values.
