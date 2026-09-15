# Four Divisors

## Description

Given an integer array `nums`, return the sum of divisors of the integers in that array that have exactly four divisors. If there is no such integer in the array, return `0`.

### Example 1

```text
Input: nums = [21,4,7]
Output: 32
Explanation:
21 has 4 divisors: 1, 3, 7, 21
4 has 3 divisors: 1, 2, 4
7 has 2 divisors: 1, 7
The answer is the sum of divisors of 21 only.
```

### Example 2

```text
Input: nums = [21,21]
Output: 64
```

### Example 3

```text
Input: nums = [1,2,3,4,5]
Output: 0
```

### Constraints

- `1 <= nums.length <= 10⁴`
- `1 <= nums[i] <= 10⁵`

## Hints

### Hint 1

Find the divisors of each element in the array.

### Hint 2

You only need to loop to the square root of a number to find its divisors.
