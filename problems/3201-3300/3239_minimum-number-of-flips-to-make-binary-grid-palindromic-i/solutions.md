# Solutions — Minimum Number of Flips to Make Binary Grid Palindromic I

## Flip each disagreeing mirror pair once

Making one row palindromic decomposes over its mirror pairs
`(row[j], row[n - 1 - j])`: a pair whose two values differ needs exactly one
flip to match, a pair that already agrees is best left alone, and the middle
cell of an odd-length row pairs with itself so it never costs anything. Flips
in different rows never interact, so the cost of making every row palindromic
is simply the total number of disagreeing row pairs. Counting the same way
down each column prices making every column palindromic, and because the goal
is satisfied by either direction alone, the answer is the smaller of the two
totals.

One inward two-index walk per line counts the disagreements; the column pass
walks the same pairs through swapped indices (`grid[i][j]` against
`grid[m - 1 - i][j]`) instead of building a transposed copy. Degenerate shapes
fall out without special cases: a single cell is its own middle, a one-row
grid always answers `0` because every one-cell column is trivially
palindromic, and likewise a one-column grid via its rows.

Each direction touches every cell once and keeps only two counters, and no
input has more than `m * n / 2 <= 10^5` mirror pairs per direction, so the
answer comfortably fits a 32-bit integer.

**Complexity:** `O(mn)` time, `O(1)` space.
