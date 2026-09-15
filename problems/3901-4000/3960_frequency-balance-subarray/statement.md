# Frequency Balance Subarray

## Description

You are given an integer array `nums`.

Define a frequency balance subarray as follows:

- If the subarray contains only one distinct value, it is frequency
  balanced.
- Otherwise, there must exist a positive integer `f` such that every
  distinct value in the subarray occurs either `f` or `2 * f` times, and both
  frequencies occur among the distinct values.

Return an integer denoting the length of the longest frequency balance
subarray.

### Example 1

```text
Input: nums = [1,2,2,1,2,3,3,3]
Output: 5
Explanation:
    The longest frequency balance subarray is [2, 1, 2, 3, 3].
    The elements that appear most frequently are 2 and 3, both appearing
    twice.
    The remaining element 1 appears once, meeting the requirements.
```

### Example 2

```text
Input: nums = [5,5,5,5]
Output: 4
Explanation:
    The longest frequency balance subarray is [5, 5, 5, 5].
    The element that appears most frequently is 5.
    There are no other elements meeting the requirements.
```

### Example 3

```text
Input: nums = [1,2,3,4]
Output: 1
Explanation:
    Since all elements appear only once, the length of the longest
    frequency balance subarray is 1.
```

### Constraints

- `1 <= nums.length <= 10³`
- `1 <= nums[i] <= 10⁹`

## Hints

### Hint 1

For each candidate subarray, maintain the frequency of every distinct value.

### Hint 2

A subarray with multiple distinct values is valid exactly when it has two
distinct frequency values, and the larger one is twice the smaller one.

### Hint 3

A subarray containing only one distinct value is always valid.
