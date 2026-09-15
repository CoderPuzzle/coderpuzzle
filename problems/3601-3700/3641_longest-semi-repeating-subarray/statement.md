# Longest Semi-Repeating Subarray

## Description

Given an integer array `nums` of length `n` and an integer `k`, call a
contiguous subarray of `nums` **semi-repeating** when at most `k` of its
values occur more than once inside it. The count is per value: a value that
appears three times still contributes one repeating value, not two.

Return the length of the longest semi-repeating subarray of `nums`.

### Example 1

```text
Input: nums = [1,2,3,1,2,3,4], k = 2
Output: 6
Explanation: The subarray [2,3,1,2,3,4] spans six elements, and exactly two
of its values repeat (2 and 3 each appear twice), which k allows. Every
seven-element window repeats all of 1, 2 and 3 and would need k >= 3.
```

### Example 2

```text
Input: nums = [1,1,1,1,1], k = 4
Output: 5
Explanation: The whole array qualifies: only one value (1) repeats within
it, and one repeating value is at most k.
```

### Example 3

```text
Input: nums = [1,1,1,1,1], k = 0
Output: 1
Explanation: No value may repeat at all, so no subarray can outgrow a
single element.
```

### Constraints

- `1 <= n <= 10⁵`
- `1 <= nums[i] <= 10⁵`
- `0 <= k <= n`

## Hints

### Hint 1

Slide a window across the array with a left and a right pointer.

### Hint 2

Keep a frequency map plus a running counter of the values whose current
frequency exceeds one.

### Hint 3

Whenever that counter climbs past `k`, advance the left pointer until it
falls back within `k`.
