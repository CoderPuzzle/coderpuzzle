# Minimum Operations to Equalize Subarrays

## Description

You are given an integer array `nums`, an integer `k`, and a 2D integer
array `queries` of length `q`, where `queries[i] = [li, ri]`.

In one operation you may increase or decrease any single element of `nums`
by exactly `k`. Operations are unlimited and may target any element, but
every operation must change its element by precisely `k`.

For each query `[li, ri]`, find the minimum number of operations required
to make all elements in the inclusive subarray `nums[li..ri]` equal to one
another. Elements outside the subarray never matter for that query. If it
is impossible to equalize the subarray no matter how many operations are
used, the answer for that query is `-1`.

Return an integer array `ans` of length `q`, where `ans[i]` is the answer
to `queries[i]`.

### Example 1

```text
Input: nums = [1,4,7], k = 3, queries = [[0,1],[0,2]]
Output: [1,2]
Explanation:
    [0, 1] covers [1, 4]: adding k once to nums[0] gives
    1 + 3 = 4 = nums[1], so the subarray equalizes in 1 operation.
    [0, 2] covers [1, 4, 7]: adding k once to nums[0] and subtracting
    k once from nums[2] turns the whole array into [4, 4, 4],
    so 2 operations suffice.
```

### Example 2

```text
Input: nums = [1,2,4], k = 2, queries = [[0,2],[0,0],[1,2]]
Output: [-1,0,1]
Explanation:
    [0, 2] covers [1, 2, 4]: their remainders mod k are 1, 0 and 0.
    Because 1 differs, no sequence of ±k moves can ever make them
    equal — the answer is -1.
    [0, 0] covers [1]: a lone element is already equal, so 0
    operations are needed.
    [1, 2] covers [2, 4]: adding k once to nums[1] gives
    2 + 2 = 4 = nums[2], so 1 operation suffices.
```

### Constraints

- `1 <= n == nums.length <= 4 * 10⁴`
- `1 <= nums[i] <= 10⁹`
- `1 <= k <= 10⁹`
- `1 <= q == queries.length <= 4 * 10⁴`
- `queries[i] = [li, ri]`
- `0 <= li <= ri <= n - 1`

## Hints

### Hint 1

Each operation shifts an element by exactly `k`, so an element's
remainder modulo `k` can never change. A subarray can be equalized only
when all of its elements share one remainder.

### Hint 2

When they do share a remainder, dividing by `k` reduces the task to
equalizing plain integers with unit steps — whose cost against a chosen
target is a sum of absolute differences, minimized at the median.

### Hint 3

A window is feasible exactly when it sits inside a maximal run of equal
remainders. For the median and the absolute-difference total over a
range, precompute quotients and answer each query with a merge sort tree:
sorted vectors per node give order statistics, prefix sums per node give
the cost split around the median.

### Hint 4

Binary search on the quotient value using the tree's sorted vectors to
count elements at or below it; the same vectors' prefix sums then price
the moves below and above the median without ever touching the window
twice.
