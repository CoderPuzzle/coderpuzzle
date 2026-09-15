# Longest Increasing Subsequence

## Description

Given an integer array `nums`, return the length of the longest
strictly increasing subsequence.

### Example 1

```text
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
```

### Example 2

```text
Input: nums = [0,1,0,3,2,3]
Output: 4
```

### Example 3

```text
Input: nums = [7,7,7,7,7,7,7]
Output: 1
```

### Constraints

- `1 <= nums.length <= 2500`
- `-10^4 <= nums[i] <= 10^4`

**Follow up:** Can you come up with an algorithm that runs in `O(n log(n))`
time complexity?

## Hints

### Hint 1

An O(n^2) DP works: dp[i] = 1 + max(dp[j]) over every j < i with nums[j] < nums[i].

### Hint 2

For O(n log n), maintain tails[k], the smallest possible tail value of an increasing subsequence of length k + 1.

### Hint 3

For each element, binary-search tails: if it extends every tail, append it; otherwise replace the first tail that is >= it.

### Hint 4

The final length of tails is the answer; the array itself stays sorted throughout.
