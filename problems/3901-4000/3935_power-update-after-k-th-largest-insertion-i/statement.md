# Power Update After K-th Largest Insertion I

## Description

You are given an integer array `nums` and an integer `p`.

You are also given a 2D integer array `queries`, where each `queries[i] =
[vali, ki]` and the difference between consecutive `ki` values is always less
than `10`.

For each query:

- Insert `vali` into `nums`.
- Let `x` be the `ki`th largest element in the current `nums`.
- Update `p` to `p^x % (10⁹ + 7)`.

Return an array `ans` where the `ans[i]` represents the value of `p` after
processing the `i`th query.

### Example 1

```text
Input: nums = [2], p = 4, queries = [[3,1],[1,2]]
Output: [64,4096]
Explanation:
    After inserting 3, the current nums is [2, 3].
    The 1st largest element is 3, so p = 4³ % (10⁹ + 7) = 64.
    After inserting 1, the current nums is [2, 3, 1].
    The 2nd largest element is 2, so p = 64² % (10⁹ + 7) = 4096.
```

### Example 2

```text
Input: nums = [7,5], p = 6, queries = [[4,3],[7,2]]
Output: [1296,220296870]
Explanation:
    After inserting 4, the current nums is [7, 5, 4].
    The 3rd largest element is 4, so p = 6⁴ % (10⁹ + 7) = 1296.
    After inserting 7, the current nums is [7, 5, 4, 7].
    The 2nd largest element is 7, so
    p = 1296⁷ % (10⁹ + 7) = 220296870.
```

### Constraints

- `1 <= nums.length <= 2 * 10⁴`
- `1 <= nums[i] <= 10⁶`
- `1 <= p <= 10⁶`
- `1 <= queries.length <= 2 * 10⁴`
- `1 <= vali <= 10⁶`
- `1 <= ki <= n + i + 1`
- `|ki - ki - 1| < 10` for `i > 0`

## Hints

### Hint 1

Keep the largest `k` elements separately. The answer is the smallest among
them.

### Hint 2

After inserting a value, rebalance the two sets/heaps so the "top `k`" side
has exactly `k` elements. Since `abs(ki - ki - 1)` is small, only a few
elements move each query.

### Hint 3

Update `p` with fast modular exponentiation.
