# Sort Items by Groups Respecting Dependencies

## Description

There are `n` items each belonging to zero or one of `m` groups where
`group[i]` is the group that the `i`-th item belongs to and it's equal to `-1`
if the `i`-th item belongs to no group. The items and the groups are zero
indexed. A group can have no item belonging to it.

Return a sorted list of the items such that:

- The items that belong to the same group are next to each other in the sorted
  list.
- There are some relations between these items where `beforeItems[i]` is a list
  containing all the items that should come before the `i`-th item in the
  sorted array (to the left of the `i`-th item).

Return any solution if there is more than one solution and return an empty list
if there is no solution.

### Example 1

```text
Input: n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3,6],[],[],[]]
Output: [6,3,4,1,5,2,0,7]
```

![A table of the eight items with their groups and prerequisites, and below it one valid sorted order with the boxes of group 0 tinted blue and group 1 tinted amber.](figures/example-1.svg)

### Example 2

```text
Input: n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3],[],[4],[]]
Output: []
Explanation: This is the same as example 1 except that 4 needs to be before 6 in the sorted list.
```

### Constraints

- `1 <= m <= n <= 3 * 10⁴`
- `group.length == beforeItems.length == n`
- `-1 <= group[i] <= m - 1`
- `0 <= beforeItems[i].length <= n - 1`
- `0 <= beforeItems[i][j] <= n - 1`
- `i != beforeItems[i][j]`
- `beforeItems[i]` does not contain duplicate elements.

## Hints

### Hint 1

Think of it as a graph problem.

### Hint 2

We need to find a topological order on the dependency graph.

### Hint 3

Build two graphs, one for the groups and another for the items.
