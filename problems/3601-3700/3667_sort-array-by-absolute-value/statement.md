# Sort Array By Absolute Value

## Description

You are given an integer array `nums`. Rearrange its elements so that their
absolute values read in non-decreasing order from left to right, and return
the rearranged array.

Ties on magnitude are pinned so that every correct answer is identical:
among elements with equal absolute value, all negative elements come before
all positive ones — between a tied pair `-x` and `x`, `-x` is placed first.
Elements that are exactly equal are interchangeable, since no reading of
the array can tell them apart.

The absolute value of an integer `x` is `x` itself when `x >= 0`, and `-x`
when `x < 0`.

### Example 1

```text
Input: nums = [3,-1,-4,1,5]
Output: [-1,1,3,-4,5]
Explanation: The absolute values are 3, 1, 4, 1, 5. In non-decreasing order
they read 1, 1, 3, 4, 5, and the tie at magnitude 1 places -1 before 1,
giving [-1,1,3,-4,5].
```

### Example 2

```text
Input: nums = [-100,100]
Output: [-100,100]
Explanation: Both elements have absolute value 100, so the tie rule places
the negative element first.
```

### Constraints

- `1 <= nums.length <= 100`
- `-100 <= nums[i] <= 100`

## Hints

### Hint 1

Sort the elements of `nums` by their absolute values.
