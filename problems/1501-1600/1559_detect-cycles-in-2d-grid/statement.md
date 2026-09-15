# Detect Cycles in 2D Grid

## Description

You are given a rectangular `grid` of lowercase English letters. Starting
from any cell, you may step to a grid-neighbor — up, down, left, or right —
whenever that neighbor holds the same letter as the cell you are leaving. A
**cycle** is such a walk of four or more steps that returns to the cell it
started from.

The one rule that keeps this from being trivial: a step may not immediately
reverse the step you just took. For example, the two-step walk
`(1,1) -> (1,2) -> (1,1)` does not count as reaching `(1,1)` again, because
the second step only retraces the cell you just left.

Return `true` if `grid` contains a cycle built from same-letter cells,
otherwise return `false`.

### Example 1

![diagram](figures/1559-1.svg)

![diagram](figures/1559-2.svg)

```text
Input: grid = [["a","a","a","a"],["a","b","b","a"],["a","b","b","a"],["a","a","a","a"]]
Output: true
Explanation: The outer ring of "a" cells closes on itself, and so does the
inner 2x2 block of "b" cells — either one is a valid cycle.
```

### Example 2

![diagram](figures/1559-3.svg)

![diagram](figures/1559-4.svg)

```text
Input: grid = [["c","c","c","a"],["c","d","c","c"],["c","c","e","c"],["f","c","c","c"]]
Output: true
Explanation: The "c" cells form a ring that encircles the interior "d" and
"e" cells, closing back on itself for the grid's only cycle.
```

### Example 3

![diagram](figures/1559-5.svg)

```text
Input: grid = [["a","b","b"],["b","z","b"],["b","b","a"]]
Output: false
Explanation: The "b" cells split into two short paths that never close a
loop — "z" and the corner "a" cells break any ring — so no cycle exists.
```

### Constraints

- `grid` holds between `1` and `500` rows, each holding the same number of
  columns, also at most `500`.
- Every cell of `grid` holds a lowercase English letter.

## Hints

### Hint 1

Track the cell you just stepped from as you walk. A step back onto that
exact cell is a reversal, not a return — it never counts as closing a
cycle.

### Hint 2

Walk each same-letter region with DFS or BFS, marking cells as you reach
them. Meeting an already-marked cell that is not the one you just came from
proves the region contains a cycle.
