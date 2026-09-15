# Minimum Adjacent Swaps to Partition Array

## Description

You are given an integer array `nums` and two integers `a` and `b` such that
`a < b`.

An array is called good if it can be split into three contiguous parts, in
this order, such that:

- Every element in the first part is less than `a`.
- Every element in the second part is in the range `[a, b]` inclusive.
- Every element in the third part is greater than `b`.

Any of the three parts may be empty.

In one adjacent swap, you may swap two neighboring elements of `nums`.

Return the minimum number of adjacent swaps required to make `nums` good.
Since the answer may be very large, return it modulo `10⁹ + 7`.

### Example 1

```text
Input: nums = [1,3,2,4,5,6], a = 3, b = 4
Output: 1
Explanation:
    Swap nums[1] and nums[2]. The array becomes [1, 2, 3, 4, 5, 6].
    This array is good because it can be split into [1, 2], [3, 4], and
    [5, 6].
```

### Example 2

```text
Input: nums = [9,7,5,3], a = 4, b = 8
Output: 5
Explanation:
    One sequence of optimal swaps is as follows:
        Swap nums[2] and nums[3]. The array becomes [9, 7, 3, 5].
        Swap nums[1] and nums[2]. The array becomes [9, 3, 7, 5].
        Swap nums[0] and nums[1]. The array becomes [3, 9, 7, 5].
        Swap nums[1] and nums[2]. The array becomes [3, 7, 9, 5].
        Swap nums[2] and nums[3]. The array becomes [3, 7, 5, 9].

    This array is good because it can be split into [3], [7, 5], and [9].
```

### Example 3

```text
Input: nums = [3,7,5,9], a = 4, b = 8
Output: 0
Explanation: The array is already good. No swaps are needed.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `1 <= a < b <= 10⁹`

## Hints

### Hint 1

Replace each element with its group number: `0` if it is less than `a`, `1`
if it is in the range `[a, b]`, and `2` if it is greater than `b`.

### Hint 2

After this replacement, the goal is to make the array sorted in non-decreasing
order.

### Hint 3

With adjacent swaps, the minimum number of swaps needed is the number of
inversions in this group array.

### Hint 4

Since there are only three possible group values, scan from left to right and
count how many previous values are greater than the current value.
