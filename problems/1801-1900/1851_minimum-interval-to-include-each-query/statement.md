# Minimum Interval to Include Each Query

## Description

You are given a 2D integer array `intervals`, where
`intervals[i] = [left_i, right_i]` describes the `i`th interval starting at
`left_i` and ending at `right_i` (inclusive). The **size** of an interval is
defined as the number of integers it contains, or more formally
`right_i - left_i + 1`.

You are also given an integer array `queries`. The answer to the `j`th query
is the **size of the smallest interval** `i` such that
`left_i <= queries[j] <= right_i`. If no such interval exists, the answer
is `-1`.

Return an array containing the answers to the queries.

### Example 1

```text
Input: intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]
Output: [3,3,1,4]
Explanation: The queries are processed as follows:
- Query = 2: The interval [2,4] is the smallest interval containing 2. The answer is 4 - 2 + 1 = 3.
- Query = 3: The interval [2,4] is the smallest interval containing 3. The answer is 4 - 2 + 1 = 3.
- Query = 4: The interval [4,4] is the smallest interval containing 4. The answer is 4 - 4 + 1 = 1.
- Query = 5: The interval [3,6] is the smallest interval containing 5. The answer is 6 - 3 + 1 = 4.
```

### Example 2

```text
Input: intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]
Output: [2,-1,4,6]
Explanation: The queries are processed as follows:
- Query = 2: The interval [2,3] is the smallest interval containing 2. The answer is 3 - 2 + 1 = 2.
- Query = 19: None of the intervals contain 19. The answer is -1.
- Query = 5: The interval [2,5] is the smallest interval containing 5. The answer is 5 - 2 + 1 = 4.
- Query = 22: The interval [20,25] is the smallest interval containing 22. The answer is 25 - 20 + 1 = 6.
```

### Constraints

- `1 <= intervals.length <= 10^5`
- `1 <= queries.length <= 10^5`
- `intervals[i].length == 2`
- `1 <= left_i <= right_i <= 10^7`
- `1 <= queries[j] <= 10^7`

## Hints

### Hint 1

Is there a way to order the intervals and queries such that it takes less time to answer each query?

### Hint 2

Going from the smallest query to the largest, add intervals whose left end is at most the query to a min-heap ordered by size, and pop intervals whose right end is below the query.
