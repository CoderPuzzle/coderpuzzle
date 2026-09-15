# Sum of Elements With Frequency Divisible by K

## Description

You are given an integer array nums and an integer k.

Return the sum of all elements whose frequency in nums is divisible by k,
or 0 if there are no such elements. A value that qualifies joins the sum
once per occurrence: when v appears f times and f is a multiple of k, the
total gains v * f.

### Example 1

```text
Input: nums = [1,2,2,3,3,3,3,4], k = 2
Output: 16
Explanation: The value 1 occurs once and the value 4 occurs once, and
neither frequency is divisible by 2, so both stay out. The value 2 occurs
twice and the value 3 occurs four times, so the total is
2 + 2 + 3 + 3 + 3 + 3 = 16.
```

### Example 2

```text
Input: nums = [1,2,3,4,5], k = 2
Output: 0
Explanation: Every value occurs exactly once, and a frequency of 1 is
never divisible by 2, so no element qualifies and the sum is 0.
```

### Example 3

```text
Input: nums = [4,4,4,1,2,3], k = 3
Output: 12
Explanation: The values 1, 2, and 3 occur once each, which 3 does not
divide, while the value 4 occurs three times. The total is therefore
4 + 4 + 4 = 12.
```

### Constraints

- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`
- `1 <= k <= 100`

## Hints

### Hint 1

Simulate the process as described.
