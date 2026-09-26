# Solutions — Grid Game

## Balance the two remaining row sums

If the first robot moves down in column `c`, it clears the top row through `c`
and the bottom row from `c` onward. The second robot can therefore collect
either the top-row sum strictly right of `c` or the bottom-row sum strictly left
of `c`, whichever is larger. The first robot chooses the column minimizing that
maximum.

![On grid [[2,5,4],[1,5,1]], each candidate down-column clears its top prefix and bottom suffix and leaves robot 2 the larger of the top-row suffix right of it and the bottom-row prefix left of it; the column maxima are 9, 4, 6, so descending at column 1 holds robot 2 to 4.](figures/solution-down-column-balance.svg)

Start with the total top-row sum and an empty bottom prefix. At each column,
remove the current top cell before evaluating the two remaining regions, update
the minimum of their maximum, and then add the current bottom cell for the next
column. All accumulations and the return value use 64 bits because a row can sum
to five billion.

**Complexity:** `O(n)` time, `O(1)` space.
