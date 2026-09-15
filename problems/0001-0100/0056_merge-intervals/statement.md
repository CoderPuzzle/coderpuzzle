# Merge Intervals

## Description

Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge
all overlapping intervals, and return _an array of the non-overlapping
intervals that cover all the intervals in the input_.

### Example 1

```text
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
```

### Example 2

```text
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```

### Example 3

```text
Input: intervals = [[4,7],[1,4]]
Output: [[1,7]]
Explanation: Intervals [1,4] and [4,7] are considered overlapping.
```

### Constraints

- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= start_i <= end_i <= 10^4`

## Hints

### Hint 1

Sort the intervals by start (then by end) so overlapping intervals become adjacent.

### Hint 2

Walk the sorted list keeping the last merged interval; extend its end when the next interval starts at or before it.

### Hint 3

Touching intervals such as [1,4] and [4,5] count as overlapping and must be merged.
