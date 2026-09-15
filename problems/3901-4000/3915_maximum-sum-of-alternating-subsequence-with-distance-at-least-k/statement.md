# Maximum Sum of Alternating Subsequence With Distance at Least K

## Description

You are given an integer array `nums` of length `n` and an integer `k`.

Pick a subsequence with indices `0 <= i1 < i2 < ... < im < n` such that:

- For every `1 <= t < m`, `i(t+1) - i(t) >= k`.
- The selected values form a strictly alternating sequence. In other words,
  either:

    - `nums[i1] < nums[i2] > nums[i3] < ...`, or
    - `nums[i1] > nums[i2] < nums[i3] > ...`

A subsequence of length 1 is also considered strictly alternating. The score
of a valid subsequence is the sum of its selected values.

Return an integer denoting the maximum possible score of a valid subsequence.

### Example 1

```text
Input: nums = [5,4,2], k = 2
Output: 7
Explanation:
    An optimal choice is indices [0, 2], which gives values [5, 2].

        The distance condition holds because 2 - 0 = 2 >= k.
        The values are strictly alternating because 5 > 2.

    The score is 5 + 2 = 7.
```

### Example 2

```text
Input: nums = [3,5,4,2,4], k = 1
Output: 14
Explanation:
    An optimal choice is indices [0, 1, 3, 4], which gives values
    [3, 5, 2, 4].

        The distance condition holds because each pair of consecutive chosen
        indices differs by at least k = 1.
        The values are strictly alternating since 3 < 5 > 2 < 4.

    The score is 3 + 5 + 2 + 4 = 14.
```

### Example 3

```text
Input: nums = [5], k = 1
Output: 5
Explanation: The only valid subsequence is [5]. A subsequence with 1 element
is always strictly alternating, so the score is 5.
```

### Constraints

- `1 <= n == nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`
- `1 <= k <= n`

## Hints

### Hint 1

Use dynamic programming.

### Hint 2

Let `dp[i][val][0/1]` represent the maximum score using the first `i` values,
where the last selected value is `val` and `0/1` indicates the alternating
relation of the last two selected values.

### Hint 3

Use a segment tree to query values greater than or less than `val` during the
DP transitions.
