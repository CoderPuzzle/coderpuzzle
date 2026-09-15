# Find the Median of the Uniqueness Array

## Description

You are given an integer array `nums`. The uniqueness array of `nums` is the
sorted array that contains the number of distinct elements of all the
subarrays of `nums`. In other words, it is a sorted array consisting of
`distinct(nums[i..j])`, for all `0 <= i <= j < nums.length`.

Here, `distinct(nums[i..j])` denotes the number of distinct elements in the
subarray that starts at index `i` and ends at index `j`.

Return the median of the uniqueness array of `nums`.

Note that the median of an array is defined as the middle element of the array
when it is sorted in non-decreasing order. If there are two choices for a
median, the smaller of the two values is taken.

### Example 1

```text
Input: nums = [1,2,3]
Output: 1
Explanation: The uniqueness array of nums is [distinct(nums[0..0]), distinct(nums[1..1]), distinct(nums[2..2]), distinct(nums[0..1]), distinct(nums[1..2]), distinct(nums[0..2])] which is equal to [1, 1, 1, 2, 2, 3]. The uniqueness array has a median of 1.
```

### Example 2

```text
Input: nums = [3,4,3,4,5]
Output: 2
Explanation: The uniqueness array of nums is [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3]. The uniqueness array has a median of 2.
```

### Example 3

```text
Input: nums = [4,3,5,4]
Output: 2
Explanation: The uniqueness array of nums is [1, 1, 1, 1, 2, 2, 2, 3, 3, 3]. The uniqueness array has a median of 2.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`

## Hints

### Hint 1

Binary search over the answer.

### Hint 2

For a candidate value x, count the number of subarrays whose distinct-element count is at most x; that tells you whether x lies below, at, or above the median.

### Hint 3

Use a sliding window to solve the counting problem in the hint above.
