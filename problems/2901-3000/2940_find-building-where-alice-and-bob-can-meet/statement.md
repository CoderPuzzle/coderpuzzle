# Find Building Where Alice and Bob Can Meet

## Description

You are given a 0-indexed array `heights` of positive integers, where `heights[i]` represents the height of the `i`th building.

If a person is in building `i`, they can move to any other building `j` if and only if `i < j` and `heights[i] < heights[j]`.

You are also given another array `queries` where `queries[i] = [ai, bi]`. On the `i`th query, Alice is in building `ai` while Bob is in building `bi`.

Return an array `ans` where `ans[i]` is the index of the leftmost building where Alice and Bob can meet on the `i`th query. If Alice and Bob cannot move to a common building on query `i`, set `ans[i]` to `-1`.

### Example 1

```text
Input: heights = [6, 4, 8, 5, 2, 7], queries = [[0, 1], [0, 3], [2, 4], [3, 4], [2, 2]]
Output: [2, 5, -1, 5, 2]
Explanation:
- In the first query, Alice and Bob can move to building 2 since heights[0] < heights[2] and heights[1] < heights[2].
- In the second query, Alice and Bob can move to building 5 since heights[0] < heights[5] and heights[3] < heights[5].
- In the third query, Alice cannot meet Bob since Alice cannot move to any other building.
- In the fourth query, Alice and Bob can move to building 5 since heights[3] < heights[5] and heights[4] < heights[5].
- In the fifth query, Alice and Bob are already in the same building.
```

### Example 2

```text
Input: heights = [5, 3, 8, 2, 6, 1, 4, 6], queries = [[0, 7], [3, 5], [5, 2], [3, 0], [1, 6]]
Output: [7, 6, -1, 4, 6]
Explanation:
- In the first query, Alice can directly move to Bob's building since heights[0] < heights[7].
- In the second query, Alice and Bob can move to building 6 since heights[3] < heights[6] and heights[5] < heights[6].
- In the third query, Alice cannot meet Bob since Bob cannot move to any other building.
- In the fourth query, Alice and Bob can move to building 4 since heights[3] < heights[4] and heights[0] < heights[4].
- In the fifth query, Alice can directly move to Bob's building since heights[1] < heights[6].
```

### Constraints

- `1 <= heights.length <= 5 * 10^4`
- `1 <= heights[i] <= 10^9`
- `1 <= queries.length <= 5 * 10^4`
- `queries[i] = [ai, bi]`
- `0 <= ai, bi <= heights.length - 1`

## Hints

### Hint 1

For each query [a, b], swap the endpoints so that a <= b.

### Hint 2

If a == b or heights[a] < heights[b], the answer is b directly.

### Hint 3

Otherwise find the smallest index t > b such that heights[t] > max(heights[a], heights[b]).

### Hint 4

A monotonic stack that supports binary search, or a segment tree that finds the first index above a threshold, answers each query efficiently.
