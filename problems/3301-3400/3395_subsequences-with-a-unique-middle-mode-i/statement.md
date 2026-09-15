# Subsequences with a Unique Middle Mode I

## Description

Given an integer array `nums`, find the number of subsequences of size 5 of
`nums` with a unique middle mode.

Since the answer may be very large, return it modulo `10⁹ + 7`.

A mode of a sequence of numbers is defined as the element that appears the
maximum number of times in the sequence.

A sequence of numbers contains a unique mode if it has only one mode.

A sequence of numbers `seq` of size 5 contains a unique middle mode if the
middle element (`seq[2]`) is a unique mode.

### Example 1

```text
Input: nums = [1,1,1,1,1,1]
Output: 6
Explanation: [1, 1, 1, 1, 1] is the only subsequence of size 5 that can be
formed, and it has a unique middle mode of 1. This subsequence can be formed
in 6 different ways, so the output is 6.
```

### Example 2

```text
Input: nums = [1,2,2,3,3,4]
Output: 4
Explanation: [1, 2, 2, 3, 4] and [1, 2, 3, 3, 4] each have a unique middle
mode because the number at index 2 has the greatest frequency in the
subsequence. [1, 2, 2, 3, 3] does not have a unique middle mode because 2
and 3 appear twice.
```

### Example 3

```text
Input: nums = [0,1,2,3,4,5,6,7,8]
Output: 0
Explanation: There is no subsequence of length 5 with a unique middle mode.
```

### Constraints

- `5 <= nums.length <= 1000`
- `-10⁹ <= nums[i] <= 10⁹`

## Hints

### Hint 1

For each index, find the number of subsequences for which it is the unique
middle mode. What combinations of values can the two numbers on the left and
the right take?

### Hint 2

For example, we can have exactly 1 element on the left equal to the middle
and all other elements differ. What other combinations are acceptable?
