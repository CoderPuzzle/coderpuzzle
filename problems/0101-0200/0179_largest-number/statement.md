# Largest Number

## Description

Given a list of non-negative integers `nums`, arrange them such that they
form the largest number and return it.

Since the result may be very large, you need to return a string instead of an
integer.

### Example 1

```text
Input: nums = [10,2]
Output: "210"
```

### Example 2

```text
Input: nums = [3,30,34,5,9]
Output: "9534330"
```

### Constraints

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 10^9`

## Hints

### Hint 1

Convert each number to a string and sort with a custom comparator: a goes before b exactly when a + b > b + a as concatenated strings.

### Hint 2

This comparator is a valid total order, so sorting by it yields the maximal arrangement.

### Hint 3

Edge case: if the first character of the result is '0', every number is 0 and the answer is the string "0".
