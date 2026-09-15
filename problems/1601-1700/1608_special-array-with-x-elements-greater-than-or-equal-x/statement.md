# Special Array With X Elements Greater Than or Equal X

## Description

You are given an array `nums` of non-negative integers. The array is
**special** if there exists a number `x` such that exactly `x` values in
`nums` are greater than or equal to `x`.

Note that `x` does not have to be an element of `nums`.

Return `x` if `nums` is special, otherwise return `-1`. It can be proven
that if `nums` is special, the value of `x` is unique.

### Example 1

```text
Input: nums = [3,5]
Output: 2
Explanation: There are 2 values (3 and 5) that are greater than or equal to 2.
```

### Example 2

```text
Input: nums = [0,0]
Output: -1
Explanation: No number fits the criteria for x.
If x = 0, there should be 0 numbers >= x, but there are 2.
If x = 1, there should be 1 number >= x, but there are 0.
If x = 2, there should be 2 numbers >= x, but there are 0.
x cannot be greater since there are only 2 numbers in nums.
```

### Example 3

```text
Input: nums = [0,4,3,0,4]
Output: 3
Explanation: There are 3 values that are greater than or equal to 3.
```

### Constraints

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 1000`

## Hints

### Hint 1

Count the number of elements greater than or equal to `x` for each `x` in
the range `[0, nums.length]`.

### Hint 2

If for any `x` the condition is satisfied, return that `x`. Otherwise,
there is no answer.
