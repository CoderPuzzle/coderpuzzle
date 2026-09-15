# Aggregate Two Time Series

## Description

You are given two 2D integer arrays `series1` and `series2`.

Each element in both series is of the form `[timestamp, value]`, where:

- `timestamp` is an integer representing the time.
- `value` is an integer representing the value at that timestamp.

Each array is sorted in strictly increasing order of timestamp.

For any timestamp not present in a series, its value is taken from the next
available timestamp in the same series if one exists. Otherwise, its value
is considered 0.

The aggregated series is formed by summing the corresponding values from
both series at every timestamp that appears in either series.

Return the aggregated series as a 2D integer array of
`[timestamp, summedValue]` pairs, sorted in strictly increasing order of
timestamp.

### Example 1

```text
Input: series1 = [[1,3],[4,1]], series2 = [[2,2],[5,2]]
Output: [[1,5],[2,3],[4,3],[5,2]]
Explanation: Thus, the aggregated series is [[1, 5], [2, 3], [4, 3], [5, 2]].
```

### Example 2

```text
Input: series1 = [[1,5],[3,1]], series2 = [[2,2]]
Output: [[1,7],[2,3],[3,1]]
Explanation: Thus, the aggregated series is [[1, 7], [2, 3], [3, 1]].
```

### Example 3

```text
Input: series1 = [[1,5]], series2 = [[1000000000,2]]
Output: [[1,7],[1000000000,2]]
Explanation: At timestamp 1, the next available value in series2 is 2 at timestamp 1000000000. At timestamp 1000000000, there is no later timestamp in series1, so its value is 0. Only timestamps that appear in at least one of the two series are included.
```

### Constraints

- `1 <= series1.length, series2.length <= 10⁵`
- `series1[i].length == series2[i].length == 2`
- `1 <= series1[i][0], series2[i][0] <= 10⁹`
- `1 <= series1[i][1], series2[i][1] <= 10⁹`
- Each series is sorted in strictly increasing order of timestamp.

## Hints

### Hint 1

Merge the timestamps from both series in increasing order, similarly to the merge step of merge sort.

### Hint 2

Because a missing timestamp uses the next available value, process the merged timestamps from right to left while maintaining the next available value in each series.

### Hint 3

At each timestamp, update the maintained value for every series containing that timestamp, then add the two maintained values to the answer.
