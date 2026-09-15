# Alt and Tab Simulation

## Description

There are `n` windows open numbered from 1 to `n`, we want to simulate using
alt + tab to navigate between the windows.

You are given an array `windows` which contains the initial order of the
windows (the first element is at the top and the last one is at the bottom).

You are also given an array `queries` where for each query, the window
`queries[i]` is brought to the top.

Return the final state of the array `windows`.

### Example 1

```text
Input: windows = [1,2,3], queries = [3,3,2]
Output: [2,3,1]
Explanation: Here is the window array after each query:
Initial order: [1,2,3]
After the first query: [3,1,2]
After the second query: [3,1,2]
After the last query: [2,3,1]
```

### Example 2

```text
Input: windows = [1,4,2,3], queries = [4,1,3]
Output: [3,1,4,2]
Explanation: Here is the window array after each query:
Initial order: [1,4,2,3]
After the first query: [4,1,2,3]
After the second query: [1,4,2,3]
After the last query: [3,1,4,2]
```

### Constraints

- `1 <= n == windows.length <= 10⁵`
- `windows` is a permutation of `[1, n]`.
- `1 <= queries.length <= 10⁵`
- `1 <= queries[i] <= n`

## Hints

### Hint 1

Let’s answer the queries offline.

### Hint 2

Start from the last query until you reach the first query.

### Hint 3

Each time, append the value of that query to a `ans` array if it wasn’t
already appended.

### Hint 4

Then start from the beginning of `windows` and append to `ans` array if it
wasn’t already appended.
