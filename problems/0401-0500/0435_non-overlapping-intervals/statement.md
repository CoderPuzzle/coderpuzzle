# Non-overlapping Intervals

## Description

Given an array of intervals `intervals` where
`intervals[i] = [start_i, end_i]`, return the minimum number of intervals you
need to remove to make the rest of the intervals non-overlapping.

Note that intervals which only touch at a point are non-overlapping. For
example, `[1, 2]` and `[2, 3]` are non-overlapping.

### Example 1

```text
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
```

### Example 2

```text
Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
```

### Example 3

```text
Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.
```

### Constraints

- `1 <= intervals.length <= 10^5`
- `intervals[i].length == 2`
- `-5 * 10^4 <= start_i < end_i <= 5 * 10^4`

## Hints

### Hint 1

Sort the intervals by their right endpoint; then a greedy choice of always keeping the interval that ends earliest is optimal.

### Hint 2

Walk the sorted intervals and keep an interval only when its start is at or after the end of the last kept interval — touching endpoints do not overlap.

### Hint 3

The answer is the number of intervals you did not keep.
