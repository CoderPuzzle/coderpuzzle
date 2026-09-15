# Maximum Subarray Sum After One Operation

## Description

You are given an integer array `nums`. You must perform exactly one
operation where you can replace one element `nums[i]` with
`nums[i] * nums[i]`.

Return the maximum possible subarray sum after exactly one operation. The
subarray must be non-empty.

### Example 1

```text
Input: nums = [2,-1,-4,-3]
Output: 17
Explanation: You can perform the operation on index 2 (0-indexed) to make
nums = [2,-1,16,-3]. Now, the maximum subarray sum is 2 + -1 + 16 = 17.
```

### Example 2

```text
Input: nums = [1,-1,1,1,-1,-1,1]
Output: 4
Explanation: You can perform the operation on index 1 (0-indexed) to make
nums = [1,1,1,1,-1,-1,1]. Now, the maximum subarray sum is 1 + 1 + 1 + 1
= 4.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `-10⁴ <= nums[i] <= 10⁴`

## Hints

### Hint 1

Think about dynamic programming.

### Hint 2

Define an array `dp[nums.length][2]`, where `dp[i][0]` is the max
subarray sum including `nums[i]` and without squaring any element.

### Hint 3

`dp[i][1]` is the max subarray sum including `nums[i]` and having only
one element squared.
