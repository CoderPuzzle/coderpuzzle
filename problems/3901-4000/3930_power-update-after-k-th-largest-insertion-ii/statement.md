# Power Update After K-th Largest Insertion II

## Description

You are given an integer array `nums` and an integer `p`.

You are also given a 2D integer array `queries`, where each
`queries[i] = [valᵢ, kᵢ]`.

For each query:

- Insert `valᵢ` into `nums`.
- Let `x` be the `kᵢ`th largest element in the current `nums`.
- Update `p` to `pˣ % (10⁹ + 7)`.

Return an array `ans` where `ans[i]` represents the value of `p` after
processing the `i`th query.

### Example 1

```text
Input: nums = [2], p = 4, queries = [[3,1],[1,2]]
Output: [64,4096]
```

### Example 2

```text
Input: nums = [7,5], p = 6, queries = [[4,3],[7,2]]
Output: [1296,220296870]
```

### Constraints

- `1 <= nums.length <= 2 * 10⁴`
- `1 <= nums[i] <= 10⁹`
- `1 <= p <= 10⁹`
- `1 <= queries.length <= 2 * 10⁴`
- `1 <= valᵢ <= 10⁹`
- `1 <= kᵢ <= n + i + 1`

## Hints

### Hint 1

Convert `k`th largest into rank `size - k + 1` in increasing order.

### Hint 2

Use coordinate compression and a Fenwick tree to find that ranked value
efficiently.

### Hint 3

Update `p` with fast modular exponentiation.
