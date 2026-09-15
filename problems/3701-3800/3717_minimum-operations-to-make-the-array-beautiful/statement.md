# Minimum Operations to Make the Array Beautiful

## Description

You are given an integer array `nums`.

The array is called beautiful when every element after the first is divisible
by the one right before it: for every index `i > 0`, `nums[i - 1]` divides
`nums[i]`.

In one operation you may choose any index `i > 0` and increase `nums[i]` by
`1`. The first element of the array can never be changed.

Return the minimum number of operations needed to make the array beautiful.

### Example 1

```text
Input: nums = [3,7,9]
Output: 2
Explanation: Incrementing nums[1] twice turns the array into [3,9,9], which
is beautiful: 9 is divisible by 3, and the final 9 is divisible by the middle
one.
```

### Example 2

```text
Input: nums = [1,1,1]
Output: 0
Explanation: Every element already divides its successor, so the array is
beautiful as given.
```

### Example 3

```text
Input: nums = [4]
Output: 0
Explanation: With a single element there is no index i > 0 to satisfy, so the
array is already beautiful.
```

### Constraints

- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 50`

## Hints

### Hint 1

Use dynamic programming.

### Hint 2

For each index i, compute dp[i][val]: the minimum number of increments that
make the prefix up to i beautiful while leaving position i holding value val.

### Hint 3

Combine the states of index i with those of index i - 1. A value at index i
can only extend values at index i - 1 that divide it.
