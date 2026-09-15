# Sum of Integers with Maximum Digit Range

## Description

You are given an integer array `nums`.

The digit range of an integer is defined as the difference between its
largest digit and smallest digit.

For example, the digit range of `5724` is `7 - 2 = 5`.

Return the sum of all integers in `nums` whose digit range is equal to the
maximum digit range among all integers in the array.

### Example 1

```text
Input: nums = [5724,111,350]
Output: 6074
Explanation:
    nums[0] = 5724: largest 7, smallest 2, digit range 5
    nums[1] = 111: largest 1, smallest 1, digit range 0
    nums[2] = 350: largest 5, smallest 0, digit range 5

    The maximum digit range is 5. The integers with this digit range are 5724
    and 350, so the answer is 5724 + 350 = 6074.
```

### Example 2

```text
Input: nums = [90,900]
Output: 990
Explanation:
    nums[0] = 90: largest 9, smallest 0, digit range 9
    nums[1] = 900: largest 9, smallest 0, digit range 9

    The maximum digit range is 9. Both integers have this digit range, so the
    answer is 90 + 900 = 990.
```

### Constraints

- `1 <= nums.length <= 100`
- `10 <= nums[i] <= 10⁵`

## Hints

### Hint 1

Compute the digit range of each number by scanning its decimal digits.

### Hint 2

First find the maximum digit range, then sum all numbers whose digit range
equals it.
