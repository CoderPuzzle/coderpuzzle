# Path Crossing

## Description

Given a string `path`, where `path[i]` is `'N'`, `'S'`, `'E'` or `'W'`,
each representing moving one unit north, south, east, or west
respectively. You start at the origin `(0, 0)` on a 2D plane and walk the
path specified by `path`.

Return true if the path crosses itself at any point — that is, if at any
time you are on a location you have previously visited. Return false
otherwise.

### Example 1

![diagram](figures/1496-1.svg)

```text
Input: path = "NES"
Output: false
Explanation: The path never visits the same point twice.
```

### Example 2

![diagram](figures/1496-2.svg)

```text
Input: path = "NESWW"
Output: true
Explanation: The path visits the origin twice.
```

### Constraints

- `1 <= path.length <= 10⁴`
- `path[i]` is either `'N'`, `'S'`, `'E'`, or `'W'`.

## Hints

### Hint 1

Simulate the process while keeping track of visited points.

### Hint 2

Use a set to store previously visited points.
