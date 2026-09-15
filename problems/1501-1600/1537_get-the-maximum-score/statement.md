# Get the Maximum Score

## Description

You are given two sorted arrays of distinct integers, `nums1` and `nums2`.

A valid path is built as follows:

- Choose either `nums1` or `nums2` to start traversing, from index 0.
- Walk the chosen array from left to right.
- Whenever the value you are currently reading appears in both arrays, you
  may switch to the other array and continue from the position right after
  that shared value. A shared value is only ever counted once, no matter
  which array you read it from.

The score of a path is the sum of its unique values. Return the maximum
score obtainable over every valid path. Since the answer can be very large,
return it modulo `10^9 + 7`.

### Example 1

![diagram](figures/1537-1.svg)

```text
Input: nums1 = [2,4,5,8,10], nums2 = [4,6,8,9]
Output: 30
Explanation: nums1 and nums2 share the values 4 and 8. The best path is
[2,4,6,8,10]: start in nums1 with 2, cross into nums2 at 4 to pick up 6,
cross back into nums1 at 8 to pick up 10. That sums to 2+4+6+8+10 = 30,
which beats every other valid path through the two arrays.
```

### Example 2

```text
Input: nums1 = [1,3,5,7,9], nums2 = [3,5,100]
Output: 109
Explanation: nums1 and nums2 share the values 3 and 5. The best path is
[1,3,5,100]: start in nums1 with 1, stay through the shared values 3 and
5, then cross into nums2 to finish with 100 instead of continuing along
nums1's 7 and 9.
```

### Example 3

```text
Input: nums1 = [1,2,3,4,5], nums2 = [6,7,8,9,10]
Output: 40
Explanation: nums1 and nums2 have no values in common, so no path can ever
cross between them. The best path is simply the array with the larger
total, [6,7,8,9,10], summing to 40.
```

### Constraints

- `1 <= nums1.length, nums2.length <= 10^5`
- `1 <= nums1[i], nums2[i] <= 10^7`
- `nums1` and `nums2` are strictly increasing.

## Hints

### Hint 1

Split each array into segments at the values the two arrays share. For each
segment you have a choice of which array to read it from — pick the path
with the larger sum, one crossing point at a time.
