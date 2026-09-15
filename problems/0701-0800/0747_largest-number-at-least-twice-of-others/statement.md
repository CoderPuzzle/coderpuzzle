# Largest Number At Least Twice of Others

## Description

You are given an integer array `nums` in which the largest integer is unique.

Determine whether the largest element in the array is at least twice as much
as every other number in the array. If it is, return the index of the largest
element, or return `-1` otherwise.

### Example 1

```text
Input: nums = [3,6,1,0]
Output: 1
Explanation: 6 is the largest integer. For every other number x in the array,
6 is at least twice as big as x. The index of value 6 is 1, so we return 1.
```

### Example 2

```text
Input: nums = [1,2,3,4]
Output: -1
Explanation: 4 is less than twice the value of 3, so we return -1.
```

### Constraints

- `2 <= nums.length <= 50`
- `0 <= nums[i] <= 100`
- The largest element in `nums` is unique.

## Hints

### Hint 1

Scan through the array to find the unique largest element `m`, keeping track
of its index `maxIndex`.

Scan through the array again. If we find some `x != m` with `m < 2*x`, we
should return `-1`.

Otherwise, we should return `maxIndex`.
