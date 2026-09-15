# Advantage Shuffle

## Description

You are given two integer arrays `nums1` and `nums2` both of the same length.
The advantage of `nums1` with respect to `nums2` is the number of indices `i`
for which `nums1[i] > nums2[i]`.

Return any permutation of `nums1` that maximizes its advantage with respect
to `nums2`. If several permutations achieve the maximum advantage, use the
following canonical strategy so the answer is unique: scan the indices `i` of
`nums2` from left to right and assign the smallest unused value of `nums1`
that is greater than `nums2[i]`; if no unused value is greater, assign the
smallest unused value.

### Example 1

```text
Input: nums1 = [2,7,11,15], nums2 = [1,10,4,11]
Output: [2,11,7,15]
```

### Example 2

```text
Input: nums1 = [12,24,8,32], nums2 = [13,25,32,11]
Output: [24,32,8,12]
```

### Constraints

- `1 <= nums1.length <= 10^5`
- `nums2.length == nums1.length`
- `0 <= nums1[i], nums2[i] <= 10^9`

## Hints

### Hint 1

This is Tian Ji's horse race: match your smallest card that still beats each opponent card, and sacrifice your weakest card when nothing wins.

### Hint 2

Process the indices of nums2 left to right; assign the smallest remaining nums1 value greater than nums2[i], or the smallest remaining value if none is greater.

### Hint 3

A sorted multiset of the remaining nums1 values (for example via binary search) keeps the whole scan at O(n log n).
