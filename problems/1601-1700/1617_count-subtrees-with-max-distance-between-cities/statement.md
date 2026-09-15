# Count Subtrees With Max Distance Between Cities

## Description

There are `n` cities, numbered from `1` to `n`, connected by `n - 1`
bidirectional roads given as `edges`, where `edges[i] = [ui, vi]`
connects cities `ui` and `vi`. These roads form a tree: there is
exactly one path between every pair of cities.

A **subtree** is a subset of the cities such that every city in the
subset can reach every other city in the subset using only roads whose
both endpoints also lie in the subset. Two subtrees are different if
some city belongs to one but not the other. Note that a subtree may
consist of a single city, but a lone city has no pair to measure a
distance between.

The **distance** between two cities is the number of roads on the
path between them. For each `d` from `1` to `n - 1`, count how many
subtrees have a maximum pairwise distance — the distance between the
two farthest cities in the subtree — equal to exactly `d`.

Return an array `ans` of length `n - 1`, where `ans[d - 1]` is the
number of subtrees whose maximum distance between two cities equals
`d`.

### Example 1

![diagram](figures/1617-1.svg)

```text
Input: n = 4, edges = [[1,2],[2,3],[2,4]]
Output: [3,4,0]
Explanation: The subtrees {1,2}, {2,3} and {2,4} each have a maximum
distance of 1. The subtrees {1,2,3}, {1,2,4}, {2,3,4} and {1,2,3,4}
each have a maximum distance of 2. No subtree has a maximum distance
of 3.
```

### Example 2

```text
Input: n = 2, edges = [[1,2]]
Output: [1]
```

### Example 3

```text
Input: n = 3, edges = [[1,2],[2,3]]
Output: [2,1]
Explanation: The subtrees {1,2} and {2,3} each have a maximum distance
of 1. The subtree {1,2,3} has a maximum distance of 2.
```

### Constraints

- `2 <= n <= 15`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `1 <= ui, vi <= n`
- All pairs `(ui, vi)` are distinct.

## Hints

### Hint 1

`n` is small enough to enumerate every possible subset of cities with
a bitmask. For each subset, how would you check whether it forms a
valid (connected) subtree?

### Hint 2

Restrict a walk to only the roads whose both endpoints are set in the
bitmask, starting from any city in the subset. The subset is a valid
subtree exactly when that walk reaches every city the bitmask marks.

### Hint 3

Within a connected subset, the maximum distance can be found without
comparing every pair: walk from any city to find the farthest city
reachable inside the subset, then walk again from that farthest city —
the distance reached this second time is the subset's maximum
distance.
