# Maximum Score of Non-overlapping Intervals

## Description

You are given a 2D integer array intervals, where `intervals[i] = [li,
ri, weighti]`. Interval i starts at position li and ends at ri, and has a
weight of weighti. You can choose up to 4 non-overlapping intervals. The
score of the chosen intervals is defined as the total sum of their
weights.

Return the lexicographically smallest array of at most 4 indices from
intervals with maximum score, representing your choice of non-overlapping
intervals.

Two intervals are said to be non-overlapping if they do not share any
points. In particular, intervals sharing a left or right boundary are
considered overlapping.

### Example 1

```text
Input: intervals = [[1,3,2],[4,5,2],[1,5,5],[6,9,3],[6,7,1],[8,9,1]]
Output: [2,3]
Explanation: You can choose the intervals with indices 2, and 3 with
respective weights of 5, and 3.
```

### Example 2

```text
Input: intervals = [[5,8,1],[6,7,7],[4,7,3],[9,10,6],[7,8,2],[11,14,3],[3,5,5]]
Output: [1,3,5,6]
Explanation: You can choose the intervals with indices 1, 3, 5, and 6
with respective weights of 7, 6, 3, and 5.
```

### Constraints

- `1 <= intevals.length <= 5 * 10⁴`
- `intervals[i].length == 3`
- `intervals[i] = [li, ri, weighti]`
- `1 <= li <= ri <= 10⁹`
- `1 <= weighti <= 10⁹`

## Hints

### Hint 1

Use Dynamic Programming.

### Hint 2

Sort intervals by right boundary.

### Hint 3

Let dp[r][i] denote the maximum score having picked r intervals from the
prefix of intervals ending at index i.

### Hint 4

dp[r][i] = max(dp[r][i - 1], intervals[i][2] + dp[r][j]) where j is the
largest index such that intervals[j][1] < intervals[i][0].

### Hint 5

Since intervals is sorted by right boundary, we can find index j using
binary search.
