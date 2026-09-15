# Sum of Digits in the Minimum Number

## Description

Given an integer array `nums`, return `0` if the sum of the digits of
the minimum integer in `nums` is odd, or `1` otherwise.

### Example 1

```text
Input: nums = [34,23,1,24,75,33,54,8]
Output: 0
Explanation: The minimal element is 1, and the sum of those digits is 1 which is odd, so the answer is 0.
```

### Example 2

```text
Input: nums = [99,77,33,66,55]
Output: 1
Explanation: The minimal element is 33, and the sum of those digits is 3 + 3 = 6 which is even, so the answer is 1.
```

### Constraints

- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

## Hints

### Hint 1

How to find the minimum number in an array?

### Hint 2

Loop over the array and compare each one of the numbers.

### Hint 3

How to find the sum of digits?

### Hint 4

Divide the number consecutively and get their remainder modulus 10.
Sum those remainders and return the answer as the problem asks.
