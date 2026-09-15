# Number of Integers With Popcount-Depth Equal to K II

## Description

You are given an integer array nums.

For any positive integer x, define the following sequence:

- p0 = x
- pi+1 = popcount(pi) for all i >= 0, where popcount(y) is the number of
  set bits (1's) in the binary representation of y.

This sequence will eventually reach the value 1.

The popcount-depth of x is defined as the smallest integer d >= 0 such
that pd = 1.

For example, if x = 7 (binary representation "111"). Then, the sequence
is: 7 → 3 → 2 → 1, so the popcount-depth of 7 is 3.

You are also given a 2D integer array queries, where each queries[i] is
either:

- [1, l, r, k] - Determine the number of indices j such that l <= j <= r
  and the popcount-depth of nums[j] is equal to k.
- [2, idx, val] - Update nums[idx] to val.

Return an integer array answer, where answer[i] is the number of indices
for the ith query of type [1, l, r, k].

### Example 1

```text
Input: nums = [2,4], queries = [[1,0,1,1],[2,1,1],[1,0,1,0]]
Output: [2,1]
Explanation:
Query 0 ([1,0,1,1]): the popcount-depths of [2,4] are [1,1], so both
    indices in [l, r] = [0, 1] count.
Query 1 ([2,1,1]): nums becomes [2,1].
Query 2 ([1,0,1,0]): nums is now [2,1] with depths [1,0]; only index 1
    has popcount-depth 0.
Thus, the final answer is [2, 1].
```

### Example 2

```text
Input: nums = [3,5,6], queries = [[1,0,2,2],[2,1,4],[1,1,2,1],[1,0,1,0]]
Output: [3,1,0]
Explanation:
Query 0 ([1,0,2,2]): the popcount-depths of [3,5,6] are [2,2,2], so all
    three indices in [l, r] = [0, 2] count.
Query 1 ([2,1,4]): nums becomes [3,4,6].
Query 2 ([1,1,2,1]): the depths of [4,6] are [1,2]; only index 1 has
    popcount-depth 1.
Query 3 ([1,0,1,0]): over [l, r] = [0, 1] no element has popcount-depth
    0.
Thus, the final answer is [3, 1, 0].
```

### Example 3

```text
Input: nums = [1,2], queries = [[1,0,1,1],[2,0,3],[1,0,0,1],[1,0,0,2]]
Output: [1,0,1]
Explanation:
Query 0 ([1,0,1,1]): the popcount-depths of [1,2] are [0,1]; index 1 has
    popcount-depth 1.
Query 1 ([2,0,3]): nums becomes [3,2].
Query 2 ([1,0,0,1]): the depths of [3,2] are [2,1]; index 0 has
    popcount-depth 2, so nothing counts for k = 1.
Query 3 ([1,0,0,2]): index 0 has popcount-depth 2.
Thus, the final answer is [1, 0, 1].
```

### Constraints

- `1 <= n == nums.length <= 10⁵`
- `1 <= nums[i] <= 10¹⁵`
- `1 <= queries.length <= 10⁵`
- `queries[i].length == 3 or 4`
- `queries[i] == [1, l, r, k] or,`
- `queries[i] == [2, idx, val]`
- `0 <= l <= r <= n - 1`
- `0 <= k <= 5`
- `0 <= idx <= n - 1`
- `1 <= val <= 10¹⁵`

## Hints

### Hint 1

Precompute depth[i] for each nums[i] by applying popcount until you reach 1.

### Hint 2

Maintain six Fenwick trees fenw[0] through fenw[5], where fenw[d] stores a 1 at index i iff depth[i] == d.

### Hint 3

For an update [2, idx, val], remove index idx from its old fenw[old_depth] and insert into fenw[new_depth]; for a query [1, l, r, k], return fenw[k].query(r) - fenw[k].query(l-1).
