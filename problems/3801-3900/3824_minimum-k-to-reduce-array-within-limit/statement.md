# Minimum K to Reduce Array Within Limit

## Description

You are given a positive integer array nums.

For a positive integer k, define nonPositive(nums, k) as the minimum number of
operations needed to make every element of nums non-positive. In one operation,
you can choose an index i and reduce nums[i] by k.

Return an integer denoting the minimum value of k such that
nonPositive(nums, k) <= k².

### Example 1

```text
Input: nums = [3,7,5]
Output: 3
Explanation: When k = 3, nonPositive(nums, k) = 6 <= k².
- Reduce nums[0] = 3 one time. nums[0] becomes 3 - 3 = 0.
- Reduce nums[1] = 7 three times. nums[1] becomes 7 - 3 - 3 - 3 = -2.
- Reduce nums[2] = 5 two times. nums[2] becomes 5 - 3 - 3 = -1.
```

### Example 2

```text
Input: nums = [1]
Output: 1
Explanation: When k = 1, nonPositive(nums, k) = 1 <= k².
- Reduce nums[0] = 1 one time. nums[0] becomes 1 - 1 = 0.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`

## Hints

### Hint 1

Use binary search
