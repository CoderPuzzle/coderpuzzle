# Smallest Common Region

## Description

You are given some lists of regions where the first region of each list
directly contains all other regions in that list.

If a region `x` contains a region `y` directly, and region `y` contains region
`z` directly, then region `x` is said to contain region `z` indirectly. Note
that region `x` also indirectly contains all regions indirectly contained in
`y`.

Naturally, if a region `x` contains (either directly or indirectly) another
region `y`, then `x` is bigger than or equal to `y` in size. Also, by
definition, a region `x` contains itself.

Given two regions: `region1` and `region2`, return the smallest region that
contains both of them.

It is guaranteed the smallest region exists.

### Example 1

```text
Input:
regions = [["Earth","North America","South America"],
["North America","United States","Canada"],
["United States","New York","Boston"],
["Canada","Ontario","Quebec"],
["South America","Brazil"]],
region1 = "Quebec",
region2 = "New York"
Output: "North America"
```

### Example 2

```text
Input: regions = [["Earth", "North America", "South America"],["North America",
"United States", "Canada"],["United States", "New York", "Boston"],
["Canada", "Ontario", "Quebec"], ["South America", "Brazil"]], region1 =
"Canada", region2 = "South America"
Output: "Earth"
```

### Constraints

- `2 <= regions.length <= 10^4`
- `2 <= regions[i].length <= 20`
- `1 <= regions[i][j].length, region1.length, region2.length <= 20`
- `region1 != region2`
- `regions[i][j]`, `region1`, and `region2` consist of English letters.
- The input is generated such that there exists a region which contains all
  the other regions, either directly or indirectly.
- A region cannot be directly contained in more than one region.

## Hints

### Hint 1

Try to model the problem as a graph problem.

### Hint 2

The given graph is a tree.

### Hint 3

The problem is reduced to finding the lowest common ancestor of two nodes in a
tree.
