# Sum of Variable Length Subarrays

## Description

You are given an integer array nums of size n. For each index i where
0 <= i < n, define a subarray nums[start ... i] where
start = max(0, i - nums[i]).

Return the total sum of all elements from the subarray defined for each index
in the array.

### Example 1

```text
Input: nums = [2,3,1]
Output: 11
Explanation:
i = 0: nums[0] = [2], sum 2
i = 1: nums[0 ... 1] = [2, 3], sum 5
i = 2: nums[1 ... 2] = [3, 1], sum 4
Total Sum: 11
The total sum is 11. Hence, 11 is the output.
```

### Example 2

```text
Input: nums = [3,1,1,2]
Output: 13
Explanation:
i = 0: nums[0] = [3], sum 3
i = 1: nums[0 ... 1] = [3, 1], sum 4
i = 2: nums[1 ... 2] = [1, 1], sum 2
i = 3: nums[1 ... 3] = [1, 1, 2], sum 4
Total Sum: 13
The total sum is 13. Hence, 13 is the output.
```

### Constraints

- `1 <= n == nums.length <= 100`
- `1 <= nums[i] <= 1000`

## Hints

### Hint 1

The constraints are small, so brute force for each index.
