# Maximum Total Subarray Value II

## Description

You are given an integer array `nums` of length `n` and an integer `k`.

Pick exactly `k` distinct subarrays `nums[l..r]` of `nums`. Subarrays may
overlap freely — sharing elements costs nothing — but the same pair of
endpoints `(l, r)` may be picked at most once.

Every pick is scored by its spread: the value of a subarray
`nums[l..r]` is `max(nums[l..r]) - min(nums[l..r])`. The total value is
the sum of the values of all chosen subarrays. Return the maximum total
value you can achieve.

### Example 1

```text
Input: nums = [1,3,2], k = 2
Output: 4
Explanation: Take nums[0..1] = [1,3], where the maximum 3 and the minimum
1 give a value of 3 - 1 = 2, and nums[0..2] = [1,3,2], which spans the
same extremes and is also worth 2. The total is 2 + 2 = 4.
```

### Example 2

```text
Input: nums = [4,2,5,1], k = 3
Output: 12
Explanation: Take nums[0..3], nums[1..3], and nums[2..3]. Each contains
the maximum 5 and the minimum 1, so each is worth 4, and the three picks
add up to 4 + 4 + 4 = 12.
```

### Constraints

- `1 <= n == nums.length <= 5 * 10⁴`
- `0 <= nums[i] <= 10⁹`
- `1 <= k <= min(10⁵, n * (n + 1) / 2)` — there are always at least `k`
  distinct subarrays to choose from.

## Hints

### Hint 1

For a fixed left endpoint `l`, widening the window never lowers the
spread: `max(nums[l..r]) - min(nums[l..r])` only grows (or stays equal) as
`r` moves right.

### Hint 2

Preprocess range-maximum and range-minimum sparse tables so that the value
of any `nums[l..r]` becomes an O(1) lookup.

### Hint 3

Seed a max-heap with the value of `nums[l..n-1]` for every `l`. Pop the
largest entry `k` times; after popping `(l, r)`, push `(l, r - 1)` when
`r > l`.
