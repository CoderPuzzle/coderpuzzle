# Valid Subarrays With Exactly One Peak

## Description

You are given an integer array nums of length n and an integer k.

An index i is a peak if:

- `0 < i < n - 1`
- `nums[i] > nums[i - 1]` and `nums[i] > nums[i + 1]`

A subarray [l, r] is valid if:

- It contains exactly one peak at index i from nums
- `i - l <= k` and `r - i <= k`

Return an integer denoting the number of valid subarrays in nums.
A subarray is a contiguous non-empty sequence of elements within an array.

### Example 1

```text
Input: nums = [1,3,2], k = 1
Output: 4
Explanation: Index i = 1 is a peak because nums[1] = 3 is greater than
nums[0] = 1 and nums[2] = 2.
Any valid subarray must include index 1, and the distance from the peak to
both ends of the subarray must not exceed k = 1.
The valid subarrays are [3], [1, 3], [3, 2], and [1, 3, 2], so the answer is
4.
```

### Example 2

```text
Input: nums = [7,8,9], k = 2
Output: 0
Explanation: There is no index i such that nums[i] is greater than both
nums[i - 1] and nums[i + 1].
Therefore, the array contains no peak. Thus, the number of valid subarrays
is 0.
```

### Example 3

```text
Input: nums = [4,3,5,1], k = 2
Output: 6
Explanation: Index i = 2 is a peak because nums[2] = 5 is greater than
nums[1] = 3 and nums[3] = 1.
Any valid subarray must contain this peak, and the distance from the peak to
both ends of the subarray must not exceed k = 2.
The valid subarrays are [5], [3, 5], [5, 1], [3, 5, 1], [4, 3, 5], and
[4, 3, 5, 1], so the answer is 6.
```

### Constraints

- `1 <= n == nums.length <= 10⁵`
- `-10⁵ <= nums[i] <= 10⁵`
- `1 <= k <= n`

## Hints

### Hint 1

Gather peak indices and find the boundaries where each is the only peak.

### Hint 2

Calculate how far the left and right endpoints for each peak can extend
under the constraints.

### Hint 3

Sum the product of the possible left and right endpoints for each peak.
