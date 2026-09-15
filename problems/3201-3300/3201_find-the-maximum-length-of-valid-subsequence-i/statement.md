# Find the Maximum Length of Valid Subsequence I

## Description

You are given an integer array `nums`.

A subsequence `sub` of `nums` with length `x` is called valid if it
satisfies:

`(sub[0] + sub[1]) % 2 == (sub[1] + sub[2]) % 2 == ... == (sub[x - 2] +
sub[x - 1]) % 2`.

Return the length of the longest valid subsequence of `nums`.

### Example 1

```text
Input: nums = [1,2,3,4]
Output: 4
Explanation: The longest valid subsequence is [1, 2, 3, 4].
```

### Example 2

```text
Input: nums = [1,2,1,1,2,1,2]
Output: 6
Explanation: The longest valid subsequence is [1, 2, 1, 2, 1, 2].
```

### Example 3

```text
Input: nums = [1,3]
Output: 2
Explanation: The longest valid subsequence is [1, 3].
```

### Constraints

- `2 <= nums.length <= 2 * 10⁵`
- `1 <= nums[i] <= 10⁷`

## Hints

### Hint 1

The possible sequence either contains all even elements, all odd elements, alternate even odd, or alternate odd even elements.

### Hint 2

Considering only the parity of elements, there are only 4 possibilities and we can try all of them.

### Hint 3

When selecting an element with any parity, try to select the earliest one.
