# Count Unhappy Friends

## Description

There are `n` friends, numbered `0` through `n - 1` (`n` is always even).
`preferences[i]` ranks every other friend from most to least preferred: the
earlier a friend appears in `preferences[i]`, the more friend `i` prefers
being paired with them.

The friends have already been split into `n / 2` pairs, given as `pairs`,
where `pairs[k] = [x, y]` means `x` and `y` are paired with each other (and
`y` is paired with `x`).

A friend `x`, currently paired with `y`, is **unhappy** if there exists some
other friend `u` — currently paired with `v` — such that **both**:

- `x` prefers `u` over `y`, and
- `u` prefers `x` over `v`.

That is, `x` and `u` would each rather switch to being paired with one
another than stay with their current partners. Return the number of
unhappy friends.

### Example 1

```text
Input: n = 4, preferences = [[1,2,3],[3,2,0],[3,1,0],[1,2,0]], pairs = [[0,1],[2,3]]
Output: 2
Explanation:
Friend 1 is unhappy: paired with 0, friend 1 prefers 3 over 0, and friend 3
prefers 1 over its own partner 2.
Friend 3 is unhappy: paired with 2, friend 3 prefers 1 over 2, and friend 1
prefers 3 over its own partner 0.
Friends 0 and 2 have no such trigger, so they stay happy.
```

### Example 2

```text
Input: n = 2, preferences = [[1],[0]], pairs = [[1,0]]
Output: 0
Explanation: With only one pair, there is no other friend `u` to compare
against, so both friends are trivially happy.
```

### Example 3

```text
Input: n = 4, preferences = [[1,3,2],[2,3,0],[1,3,0],[0,2,1]], pairs = [[1,3],[0,2]]
Output: 4
Explanation: Every friend finds a trigger — all four end up unhappy.
```

### Constraints

- `2 <= n <= 500`
- `n` is even.
- `preferences.length == n`
- `preferences[i].length == n - 1`
- `0 <= preferences[i][j] <= n - 1`
- `preferences[i]` does not contain `i`.
- Every value in `preferences[i]` is unique.
- `pairs.length == n / 2`
- `pairs[i].length == 2`
- `pairs[i][0] != pairs[i][1]`
- `0 <= pairs[i][0], pairs[i][1] <= n - 1`
- Each friend appears in exactly one pair.

## Hints

### Hint 1

Build a `rank` table where `rank[i][j]` is how highly friend `i` ranks
friend `j`. With that table, "does `i` prefer `j` over `k`" is a single
`O(1)` comparison instead of a scan through `preferences[i]`.
