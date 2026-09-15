# Number of Subarrays Having Even Product

## Description

Given a 0-indexed integer array `nums`, return the number of subarrays of
`nums` having an even product.

### Example 1

```text
Input: nums = [9,6,7,13]
Output: 6
Explanation: There are 6 subarrays with an even product:
- nums[0..1] = 9 * 6 = 54.
- nums[0..2] = 9 * 6 * 7 = 378.
- nums[0..3] = 9 * 6 * 7 * 13 = 4914.
- nums[1..1] = 6.
- nums[1..2] = 6 * 7 = 42.
- nums[1..3] = 6 * 7 * 13 = 546.
```

### Example 2

```text
Input: nums = [7,3,5]
Output: 0
Explanation: There are no subarrays with an even product.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`

## Hints

### Hint 1

The product of elements in a subarray is even if it contains at least one
even element.

### Hint 2

Iterate from left to right and save the last index of an even number. Let
that saved index be “j”.

### Hint 3

It can be seen that every subarray starting from earlier than index “j” and
ending at the current index has an even product.
