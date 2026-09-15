# Maximum White Tiles Covered by a Carpet

## Description

You are given a 2D integer array `tiles` where `tiles[i] = [li, ri]`
represents that every tile `j` in the range `li <= j <= ri` is colored white.

You are also given an integer `carpetLen`, the length of a single carpet that
can be placed anywhere.

Return the maximum number of white tiles that can be covered by the carpet.

### Example 1

![diagram](figures/2271-1.svg)

```text
Input: tiles = [[1,5],[10,11],[12,18],[20,25],[30,32]], carpetLen = 10
Output: 9
Explanation: Place the carpet starting on tile 10.
It covers 9 white tiles, so we return 9.
Note that there may be other places where the carpet covers 9 white tiles.
It can be shown that the carpet cannot cover more than 9 white tiles.
```

### Example 2

![diagram](figures/2271-2.svg)

```text
Input: tiles = [[10,11],[1,1]], carpetLen = 2
Output: 2
Explanation: Place the carpet starting on tile 10.
It covers 2 white tiles, so we return 2.
```

### Constraints

- `1 <= tiles.length <= 5 * 10⁴`
- `tiles[i].length == 2`
- `1 <= li <= ri <= 10⁹`
- `1 <= carpetLen <= 10⁹`
- The tiles are non-overlapping.

## Hints

### Hint 1

Think about the potential placements of the carpet in an optimal solution.

### Hint 2

Can we use Prefix Sum and Binary Search to determine how many tiles are
covered for a given placement?
