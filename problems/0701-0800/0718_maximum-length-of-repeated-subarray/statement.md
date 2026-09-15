# Maximum Length of Repeated Subarray

## Description

Given two integer arrays `nums1` and `nums2`, return the maximum length of a
subarray that appears in both arrays.

### Example 1

```text
Input: nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
Output: 3
Explanation: The repeated subarray with maximum length is [3,2,1].
```

### Example 2

```text
Input: nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
Output: 5
Explanation: The repeated subarray with maximum length is [0,0,0,0,0].
```

### Constraints

- `1 <= nums1.length, nums2.length <= 1000`
- `0 <= nums1[i], nums2[i] <= 100`

## Hints

### Hint 1

Use dynamic programming: let dp[i][j] be the length of the longest common prefix of nums1[i:] and nums2[j:].

### Hint 2

When nums1[i] == nums2[j], dp[i][j] = dp[i+1][j+1] + 1; otherwise dp[i][j] = 0, because a common subarray must be contiguous.

### Hint 3

The answer is the maximum of dp[i][j] over all i, j.
