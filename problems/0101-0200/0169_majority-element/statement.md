# Majority Element

## Description

Given an array `nums` of size `n`, return the majority element.

The majority element is the element that appears more than `floor(n / 2)`
times. You may assume that the majority element always exists in the array.

### Example 1

```text
Input: nums = [3,2,3]
Output: 3
```

### Example 2

```text
Input: nums = [2,2,1,1,1,2,2]
Output: 2
```

### Constraints

- `n == nums.length`
- `1 <= n <= 5 * 10^4`
- `-10^9 <= nums[i] <= 10^9`
- The input is generated such that a majority element will exist in the
  array.

Follow-up: Could you solve the problem in linear time and in `O(1)` space?

## Hints

### Hint 1

The majority element appears more than n/2 times, so it outnumbers all other elements combined.

### Hint 2

Boyer-Moore voting: keep a candidate and a counter, increment on a match, decrement otherwise, and adopt a new candidate whenever the counter hits zero.

### Hint 3

Alternatively, sorting works because the majority element always occupies the middle position of the sorted array.
