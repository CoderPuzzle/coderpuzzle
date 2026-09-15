# Set Intersection Size At Least Two

## Description

You are given a 2D integer array `intervals`, where `intervals[i] = [starti, endi]`
represents all the integers from `starti` to `endi` inclusively.

A containing set is an array `nums`, where each interval from `intervals` has at
least two integers in `nums`.

- For example, if `intervals = [[1,3], [3,7], [8,9]]`, then `[1,2,4,7,8,9]` and
  `[2,3,4,8,9]` are containing sets.

Return the minimum possible size of a containing set.

### Example 1

```text
Input: intervals = [[1,3],[3,7],[8,9]]
Output: 5
Explanation: let nums = [2, 3, 4, 8, 9].
It can be shown that there cannot be any containing array of size 4.
```

### Example 2

```text
Input: intervals = [[1,3],[1,4],[2,5],[3,5]]
Output: 3
Explanation: let nums = [2, 3, 4].
It can be shown that there cannot be any containing array of size 2.
```

### Example 3

```text
Input: intervals = [[1,2],[2,3],[2,4],[4,5]]
Output: 5
Explanation: let nums = [1, 2, 3, 4, 5].
It can be shown that there cannot be any containing array of size 4.
```

### Constraints

- `1 <= intervals.length <= 3000`
- `intervals[i].length == 2`
- `0 <= starti < endi <= 10⁸`

## Hints

### Hint 1

Scan the intervals in order of their right endpoints; the most useful points to add for an interval are the largest ones inside it, because they can also serve later intervals.

### Hint 2

For each interval, only need to know how many of the last two chosen points already lie inside it.

### Hint 3

If an interval already contains two chosen points, nothing new is added; if it contains one, add its right endpoint; if none, add the two largest points in it.
