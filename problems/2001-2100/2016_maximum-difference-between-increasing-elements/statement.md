# Maximum Difference Between Increasing Elements

## Description

Given a 0-indexed integer array `nums` of size `n`, find the maximum difference
between `nums[i]` and `nums[j]` (that is, `nums[j] - nums[i]`), such that
`0 <= i < j < n` and `nums[i] < nums[j]`.

Return the maximum difference. If no such `i` and `j` exist, return `-1`.

### Example 1

```text
Input: nums = [7,1,5,4]
Output: 4
Explanation: The maximum difference occurs with i = 1 and j = 2:
nums[j] - nums[i] = 5 - 1 = 4.
Although i = 1 and j = 0 would give 7 - 1 = 6, it is invalid because i > j.
```

### Example 2

```text
Input: nums = [9,4,3,2]
Output: -1
Explanation: There are no i and j such that i < j and nums[i] < nums[j].
```

### Example 3

```text
Input: nums = [1,5,2,10]
Output: 9
Explanation: The maximum difference occurs with i = 0 and j = 3:
nums[j] - nums[i] = 10 - 1 = 9.
```

### Constraints

- `n == nums.length`
- `2 <= n <= 1000`
- `1 <= nums[i] <= 10⁹`

## Hints

### Hint 1

Could you keep track of the minimum element visited while traversing?

### Hint 2

We have a potential candidate for the answer if the prefix min is less than
`nums[i]`.
