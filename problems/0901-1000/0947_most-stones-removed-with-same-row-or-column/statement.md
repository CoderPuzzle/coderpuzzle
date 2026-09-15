# Most Stones Removed with Same Row or Column

## Description

On a 2D plane, `n` stones are placed at integer coordinate points, with at
most one stone on each point. The stone at index `i` sits in row `xi` and
column `yi`, given as `stones[i] = [xi, yi]`.

One move removes a single stone, and a stone may be removed only while it
shares its row or its column with another stone that is still on the plane.
Stones never move, so every later move is judged against the stones that
remain at that moment.

Return the largest possible number of stones that can be removed.

### Example 1

```text
Input: stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
Output: 5
Explanation: Removing [2,2], [2,1], [1,2], [1,0], and [0,1], in that order,
leaves every move legal, so 5 stones can go. The stone [0,0] is then the
only one left, and a lone stone shares its row and column with nothing.
```

### Example 2

```text
Input: stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
Output: 3
Explanation: Removing [2,2], [2,0], and then [0,2] works, since each shares
a row or column with a stone that is still on the plane. Afterwards only
[0,0] and [1,1] remain, and they share neither a row nor a column.
```

### Example 3

```text
Input: stones = [[0,0]]
Output: 0
Explanation: [0,0] is the only stone on the plane, so nothing can be removed.
```

### Constraints

- `1 <= stones.length <= 1000`
- `0 <= xi, yi <= 10⁴`
- No two stones are at the same coordinate point.
