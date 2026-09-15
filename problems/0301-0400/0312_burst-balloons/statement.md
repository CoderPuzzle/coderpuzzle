# Burst Balloons

## Description

You are given `n` balloons, indexed from `0` to `n - 1`. Each balloon is
painted with a number on it represented by an array `nums`. You are asked to
burst all the balloons.

If you burst the `i`th balloon, you will get `nums[i - 1] * nums[i] *
nums[i + 1]` coins. If `i - 1` or `i + 1` goes out of bounds of the array,
then treat it as if there is a balloon with a `1` painted on it.

Return the maximum coins you can collect by bursting the balloons wisely.

### Example 1

```text
Input: nums = [3,1,5,8]
Output: 167
Explanation:
nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167
```

### Example 2

```text
Input: nums = [1,5]
Output: 10
```

### Constraints

- `n == nums.length`
- `1 <= n <= 300`
- `0 <= nums[i] <= 100`

## Hints

### Hint 1

Pad the array with a 1 on both ends so boundary balloons are handled uniformly.

### Hint 2

Decide which balloon is the very last one to burst inside each subarray: by then all of its inner neighbors are gone, so its contribution depends only on the two balloons that remain on its left and right.

### Hint 3

Define dp[i][j] as the maximum coins from bursting every balloon strictly between indices i and j (the open interval), then fill the table by increasing subarray length.

### Hint 4

For each k strictly between i and j, treat k as the last burst and take nums[i] * nums[k] * nums[j] plus the two subproblems dp[i][k] and dp[k][j].
