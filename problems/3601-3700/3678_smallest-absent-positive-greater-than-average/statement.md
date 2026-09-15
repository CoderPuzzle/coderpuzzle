# Smallest Absent Positive Greater Than Average

## Description

You are given an integer array `nums`. Its average is the exact real number
`sum(nums) / n`, where `n` is the length of the array. Return the smallest
positive integer that is strictly greater than that average and does not
appear anywhere in `nums`.

Strictly greater compares against the average's exact value, not a rounded
copy of it: when the average is exactly an integer, that integer itself does
not qualify, and when the average falls between two integers, no candidate
below the next one up qualifies either. Because the answer must be positive,
the search never starts below 1 — which matters whenever negative values
drag the average down.

### Example 1

```text
Input: nums = [3,5]
Output: 6
Explanation: The average is (3 + 5) / 2 = 4. Integers above 4 start at 5;
5 appears in nums, but 6 does not, so the answer is 6.
```

### Example 2

```text
Input: nums = [-1,1,2]
Output: 3
Explanation: The average is (-1 + 1 + 2) / 3 = 2/3, about 0.667. Every
positive integer is greater than it; 1 and 2 appear in nums, but 3 does
not, so the answer is 3.
```

### Example 3

```text
Input: nums = [4,-1]
Output: 2
Explanation: The average is (4 + (-1)) / 2 = 1.5. Integers above 1.5 start
at 2, and 2 does not appear in nums, so the answer is 2.
```

### Constraints

- `1 <= nums.length <= 100`
- `-100 <= nums[i] <= 100`

## Hints

### Hint 1

Start from the smallest integer strictly greater than the average —
`floor(avg) + 1` — raised to 1 whenever that lands at or below zero, since
the answer is required to be positive.

### Hint 2

Increment that candidate until it is not present in the array, then return
it.
