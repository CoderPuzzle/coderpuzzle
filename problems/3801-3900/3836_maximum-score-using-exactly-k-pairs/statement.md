# Maximum Score Using Exactly K Pairs

## Description

You are given two integer arrays nums1 and nums2 of lengths n and m
respectively, and an integer k.

You must choose exactly k pairs of indices (i1, j1), (i2, j2), ..., (ik, jk)
such that:

- 0 <= i1 < i2 < ... < ik < n
- 0 <= j1 < j2 < ... < jk < m

For each chosen pair (i, j), you gain a score of nums1[i] * nums2[j].

The total score is the sum of the products of all selected pairs.

Return an integer representing the maximum achievable total score.

### Example 1

```text
Input: nums1 = [1,3,2], nums2 = [4,5,1], k = 2
Output: 22
Explanation: One optimal choice of index pairs is:
(i1, j1) = (1, 0) which scores 3 * 4 = 12
(i2, j2) = (2, 1) which scores 2 * 5 = 10
This gives a total score of 12 + 10 = 22.
```

### Example 2

```text
Input: nums1 = [-2,0,5], nums2 = [-3,4,-1,2], k = 2
Output: 26
Explanation: One optimal choice of index pairs is:
(i1, j1) = (0, 0) which scores -2 * -3 = 6
(i2, j2) = (2, 1) which scores 5 * 4 = 20
The total score is 6 + 20 = 26.
```

### Example 3

```text
Input: nums1 = [-3,-2], nums2 = [1,2], k = 2
Output: -7
Explanation: The optimal choice of index pairs is:
(i1, j1) = (0, 0) which scores -3 * 1 = -3
(i2, j2) = (1, 1) which scores -2 * 2 = -4
The total score is -3 + (-4) = -7.
```

### Constraints

- `1 <= n == nums1.length <= 100`
- `1 <= m == nums2.length <= 100`
- `-10⁶ <= nums1[i], nums2[i] <= 10⁶`
- `1 <= k <= min(n, m)`

## Hints

### Hint 1

Use dynamic programming

### Hint 2

Let dynamic programming states dp(i, j, k), denote the maximum k-th pair sum
you can get from the first nums1[0..i] and nums2[0..j]

### Hint 3

Transition: dp(i, j, t) = max(dp(i - 1, j, t), dp(i, j - 1, t), dp(i - 1,
j - 1, t - 1) + nums1[i] * nums2[j])
