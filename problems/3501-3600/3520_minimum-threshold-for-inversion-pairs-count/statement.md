# Minimum Threshold for Inversion Pairs Count

## Description

You are given an array of integers `nums` and an integer `k`.

An inversion pair with a threshold `x` is defined as a pair of indices
`(i, j)` such that:

- `i < j`
- `nums[i] > nums[j]`
- The difference between the two numbers is at most `x` (i.e.
  `nums[i] - nums[j] <= x`).

Your task is to determine the minimum integer `min_threshold` such that
there are at least `k` inversion pairs with threshold `min_threshold`.

If no such integer exists, return `-1`.

### Example 1

```text
Input: nums = [1,2,3,4,3,2,1], k = 7
Output: 2
Explanation:
For threshold x = 2, the pairs are:

    (3, 4) where nums[3] == 4 and nums[4] == 3.
    (2, 5) where nums[2] == 3 and nums[5] == 2.
    (3, 5) where nums[3] == 4 and nums[5] == 2.
    (4, 5) where nums[4] == 3 and nums[5] == 2.
    (1, 6) where nums[1] == 2 and nums[6] == 1.
    (2, 6) where nums[2] == 3 and nums[6] == 1.
    (4, 6) where nums[4] == 3 and nums[6] == 1.
    (5, 6) where nums[5] == 2 and nums[6] == 1.

There are less than k inversion pairs if we choose any integer less than 2
as threshold.
```

### Example 2

```text
Input: nums = [10,9,9,9,1], k = 4
Output: 8
Explanation:
For threshold x = 8, the pairs are:

    (0, 1) where nums[0] == 10 and nums[1] == 9.
    (0, 2) where nums[0] == 10 and nums[2] == 9.
    (0, 3) where nums[0] == 10 and nums[3] == 9.
    (1, 4) where nums[1] == 9 and nums[4] == 1.
    (2, 4) where nums[2] == 9 and nums[4] == 1.
    (3, 4) where nums[3] == 9 and nums[4] == 1.

There are less than k inversion pairs if we choose any integer less than 8
as threshold.
```

### Constraints

- `1 <= nums.length <= 10⁴`
- `1 <= nums[i] <= 10⁹`
- `1 <= k <= 10⁹`

## Hints

### Hint 1

Perform a binary search to find the minimum threshold

### Hint 2

Use a segment tree with value compression to count inversion pairs
efficiently during the binary search
