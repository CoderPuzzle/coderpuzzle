# Max Consecutive Ones III

## Description

Given a binary array `nums` and an integer `k`, return the maximum number
of consecutive `1`'s in the array if you can flip at most `k` `0`'s.

### Example 1

```text
Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
```

### Example 2

```text
Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `nums[i]` is either `0` or `1`.
- `0 <= k <= nums.length`

## Hints

### Hint 1

Only flip a zero if it extends an existing window of 1s — think sliding window.

### Hint 2

In any valid window there can never be more than k zeros.

### Hint 3

The window size grows and shrinks based on how many zeros are inside it; you never actually flip anything.

### Hint 4

Shrink from the left when the zero count exceeds k, otherwise keep expanding to the right.
