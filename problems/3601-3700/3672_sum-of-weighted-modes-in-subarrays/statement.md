# Sum of Weighted Modes in Subarrays

## Description

You are given an integer array `nums` and an integer `k`.

Consider every subarray of `nums` whose length is exactly `k`. Each such
subarray is scored by two quantities:

- The **mode** is the value that occurs the most times in the subarray; when
  several values are tied for the highest frequency, the smallest tied value
  is taken.
- The **weight** is the mode multiplied by its frequency within that
  subarray.

Return the sum of the weights over all length-`k` subarrays. The answer
always fits in a 64-bit integer.

### Example 1

```text
Input: nums = [1,2,2,3], k = 3
Output: 8
Explanation: The length-3 subarrays are [1,2,2] and [2,2,3]. In both, 2
occurs twice while every other value occurs once, so 2 is the mode of each
subarray and both weights are 2 * 2 = 4. The total is 4 + 4 = 8.
```

### Example 2

```text
Input: nums = [1,2,1,2], k = 2
Output: 3
Explanation: The subarrays [1,2], [2,1] and [1,2] each hold two values with
frequency 1, so the tie goes to the smaller value 1 every time and each
weight is 1 * 1 = 1. The total is 1 + 1 + 1 = 3.
```

### Example 3

```text
Input: nums = [4,3,4,3], k = 3
Output: 14
Explanation: In [4,3,4] the value 4 occurs twice, giving weight 2 * 4 = 8;
in [3,4,3] the value 3 occurs twice, giving weight 2 * 3 = 6. The total is
8 + 6 = 14.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`
- `1 <= k <= nums.length`

## Hints

### Hint 1

Use a sliding window.

### Hint 2

Maintain the maximum frequency of the current window of length `k` using a
data structure that follows the window's entries and exits.

### Hint 3

Maintain another data structure that groups the window's values by their
frequency, so the smallest value at the top frequency can be read off
without rescanning the window.
