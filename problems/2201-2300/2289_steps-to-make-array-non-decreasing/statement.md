# Steps to Make Array Non-decreasing

## Description

You are given a 0-indexed integer array `nums`. In one step, remove all
elements `nums[i]` where `nums[i - 1] > nums[i]` for all
`0 < i < nums.length`.

Return the number of steps performed until `nums` becomes a non-decreasing
array.

### Example 1

```text
Input: nums = [5,3,4,4,7,3,6,11,8,5,11]
Output: 3
Explanation: The following are the steps performed:
- Step 1: [5,3,4,4,7,3,6,11,8,5,11] becomes [5,4,4,7,6,11,11]
- Step 2: [5,4,4,7,6,11,11] becomes [5,4,7,11,11]
- Step 3: [5,4,7,11,11] becomes [5,7,11,11]
[5,7,11,11] is a non-decreasing array. Therefore, we return 3.
```

### Example 2

```text
Input: nums = [4,5,7,7,13]
Output: 0
Explanation: nums is already a non-decreasing array. Therefore, we return 0.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

## Hints

### Hint 1

Notice that an element will be removed if and only if there exists a strictly greater element to the left of it in the array.

### Hint 2

For each element, find the number of rounds it takes for it to be removed; the answer is the maximum over all elements. Build a dp array to hold this, where the answer is the maximum value of dp.

### Hint 3

Use a stack of indices. While processing nums[i], pop all indices of elements smaller than nums[i]; dp[i] is the maximum of dp[i] + 1 and the dp of each popped index.
