# Trionic Array II

## Description

You are given an integer array `nums` of length `n`.

A trionic subarray is a contiguous subarray `nums[l...r]` (with
`0 <= l < r < n`) for which there exist indices `l < p < q < r` such that:

- `nums[l...p]` is strictly increasing,
- `nums[p...q]` is strictly decreasing,
- `nums[q...r]` is strictly increasing.

In other words, the subarray climbs, then descends, then climbs again, and
each of the three slopes spans at least two elements. The slopes share their
boundary elements: the peak `p` belongs to both the first climb and the
descent, and the valley `q` belongs to both the descent and the final climb.

Return the maximum sum of any trionic subarray in `nums`. It is guaranteed
that at least one trionic subarray exists.

### Example 1

```text
Input: nums = [0,-2,-1,-3,0,2,-1]
Output: -4
Explanation: Pick l = 1, p = 2, q = 3, r = 5:
- nums[l...p] = [-2,-1] is strictly increasing (-2 < -1).
- nums[p...q] = [-1,-3] is strictly decreasing (-1 > -3).
- nums[q...r] = [-3,0,2] is strictly increasing (-3 < 0 < 2).
The sum is (-2) + (-1) + (-3) + 0 + 2 = -4.
```

### Example 2

```text
Input: nums = [1,4,2,7]
Output: 14
Explanation: Pick l = 0, p = 1, q = 2, r = 3:
- nums[l...p] = [1,4] is strictly increasing (1 < 4).
- nums[p...q] = [4,2] is strictly decreasing (4 > 2).
- nums[q...r] = [2,7] is strictly increasing (2 < 7).
The sum is 1 + 4 + 2 + 7 = 14.
```

### Constraints

- `4 <= n == nums.length <= 10⁵`
- `-10⁹ <= nums[i] <= 10⁹`
- It is guaranteed that at least one trionic subarray exists.

## Hints

### Hint 1

Use dynamic programming. Think of a trionic subarray as four phases: start,
first increase, decrease, second increase.

### Hint 2

Keep four arrays dp0…dp3 where dpk[i] is the maximum sum of a subarray ending
at i after finishing k of the four phases. Let dp0[i] be the maximum sum of a
strictly increasing run ending at i; a lone element counts as a run, while
dp1 requires the run to have climbed at least once.

### Hint 3

Process each i > 0, comparing nums[i] with nums[i-1]; states can only extend
along steps matching their slope.

### Hint 4

If nums[i] > nums[i-1], set dp1[i] = max(dp1[i-1], dp0[i-1]) + nums[i] and
dp3[i] = max(dp3[i-1], dp2[i-1]) + nums[i].

### Hint 5

If nums[i] < nums[i-1], set dp2[i] = max(dp2[i-1], dp1[i-1]) + nums[i].

### Hint 6

On a rising step also grow the first slope: dp0[i] = dp0[i-1] + nums[i], and
nums[i] alone always starts a fresh dp0 run.

### Hint 7

The answer is the maximum value in dp3 over all i.
