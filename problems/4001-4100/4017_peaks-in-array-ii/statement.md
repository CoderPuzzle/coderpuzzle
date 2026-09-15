# Peaks in Array II

## Description

You are given an integer array `nums` of length `n` and a 2D integer array
`queries`.

A subarray `nums[i..j]` is called a peak subarray if:

- Its length is at least 3.
- There exists an index `k` such that `i < k < j` and:
    - `nums[k] > nums[k - 1]`
    - `nums[k] > nums[k + 1]`

You have to process queries of two types:

- `[1, li, ri]`: Calculate the number of peak subarrays fully contained
  within `nums[li..ri]`.
- `[2, indexi, vali]`: Update `nums[indexi]` to `vali`. This update applies
  to all subsequent queries.

Return an array `answer`, where `answer[i]` is the answer to the `i`th query
of type 1 in the order they appear.

### Example 1

```text
Input: nums = [1,3,2,4], queries = [[1,0,3],[2,1,1],[1,0,3]]
Output: [2,0]
Explanation:
    Query [1, 0, 3]:
        [1, 3, 2]: choose k = 1. Then nums[k] = 3, nums[k - 1] = 1, and nums[k + 1] = 2. Since 3 > 1 and 3 > 2, this is a peak subarray.
        [1, 3, 2, 4]: choose k = 1. Then nums[k] = 3, nums[k - 1] = 1, and nums[k + 1] = 2. Since 3 > 1 and 3 > 2, this is a peak subarray.
    Query [2, 1, 1]: Update nums[1] to 1. The array becomes [1, 1, 2, 4].
    Query [1, 0, 3]: There are no peak subarrays now.
    Thus, answer = [2, 0].
```

### Example 2

```text
Input: nums = [9,8,9,8], queries = [[1,1,3],[2,2,1],[1,0,2]]
Output: [1,0]
Explanation:
    Query [1, 1, 3]:
        nums[1..3] = [8, 9, 8]: choose k = 2. Then nums[k] = 9, nums[k - 1] = 8, and nums[k + 1] = 8. Since 9 > 8 and 9 > 8, this is a peak subarray.
    Query [2, 2, 1]: Update nums[2] to 1. The array becomes [9, 8, 1, 8].
    Query [1, 0, 2]: There are no peak subarrays.
    Thus, answer = [1, 0].
```

### Example 3

```text
Input: nums = [3,6,2,7,1], queries = [[1,1,3],[2,3,0],[1,0,4]]
Output: [0,3]
Explanation:
    Query [1, 1, 3]: The only subarray of length at least 3 is [6, 2, 7]. Its only possible peak index is k = 2, but nums[2] = 2 is less than both nums[1] = 6 and nums[3] = 7, so it is not a peak subarray.
    Query [2, 3, 0]: Update nums[3] to 0. The array becomes [3, 6, 2, 0, 1].
    Query [1, 0, 4]:
        [3, 6, 2]: choose k = 1. Then nums[k] = 6, nums[k - 1] = 3, and nums[k + 1] = 2. Since 6 > 3 and 6 > 2, this is a peak subarray.
        [3, 6, 2, 0]: choose k = 1. Then nums[k] = 6, nums[k - 1] = 3, and nums[k + 1] = 2. Since 6 > 3 and 6 > 2, this is a peak subarray.
        [3, 6, 2, 0, 1]: choose k = 1. Then nums[k] = 6, nums[k - 1] = 3, and nums[k + 1] = 2. Since 6 > 3 and 6 > 2, this is a peak subarray.
    Thus, answer = [0, 3].
```

### Constraints

- `3 <= n == nums.length <= 10⁵`
- `0 <= nums[i] <= 10⁵`
- `1 <= queries.length <= 10⁵`
- `queries[i] = [1, li, ri]` or `queries[i] = [2, indexi, vali]`
- `0 <= li < ri <= n - 1`
- `0 <= indexi <= n - 1`
- `0 <= vali <= 10⁵`

## Hints

### Hint 1

Maintain all indices `p` such that `nums[p] > nums[p - 1]` and
`nums[p] > nums[p + 1]`. After updating `nums[index]`, only the peak status
of `index - 1`, `index`, and `index + 1` can change.

### Hint 2

Suppose the peak indices strictly inside a query range `[l, r]` are
`p1 < p2 < ... < pt`. Attribute every peak subarray to its leftmost peak.
Its total contribution is
`(p1 - l)(r - p1) + sum((pi - pi-1)(r - pi))` for `2 <= i <= t`.

### Hint 3

Store the peak indices in a sorted set. For every peak `p`, let `prev(p)` be
the preceding peak and maintain `value[p] = p * (p - prev(p))` in a Fenwick
tree. If no preceding peak exists, use 0 as `prev(p)`.

### Hint 4

For a query, let `a` and `b` be the first and last peaks strictly inside
`[l, r]`, and let `q = prev(a)`. If no such peak exists, the answer is 0.
Otherwise, if `W` is the Fenwick-tree sum of `value[p]` from `a` through
`b`, the answer is `r * (b - l) - W + a * (l - q)`.
