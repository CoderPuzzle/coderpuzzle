# Majority Element II

## Description

Given an integer array `nums` of size `n`, find all elements that appear more than
`⌊n / 3⌋` times.

Return the answer in ascending order.

### Example 1

```text
Input: nums = [3,2,3]
Output: [3]
```

### Example 2

```text
Input: nums = [1]
Output: [1]
```

### Example 3

```text
Input: nums = [1,2]
Output: [1,2]
```

### Constraints

- `1 <= nums.length <= 5 * 10⁴`
- `-10⁹ <= nums[i] <= 10⁹`

### Follow-up

Could you solve the problem in linear time and in `O(1)` space?

## Hints

### Hint 1

Think about the possible number of elements that can appear more than `⌊ n/3 ⌋` times in the array.

### Hint 2

It can be at most two. Why?

### Hint 3

Consider using Boyer-Moore Voting Algorithm, which is efficient for finding elements that appear more than a certain threshold.
