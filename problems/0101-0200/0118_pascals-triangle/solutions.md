# Solutions — Pascal's Triangle

## Row-by-row dynamic programming

The triangle supplies its own recurrence: row 0 is a single 1, and every later row carries a 1 at each end while each interior cell is the sum of the two cells directly above it. Reading that recurrence top-down turns construction into bookkeeping — when a row is being filled, the row above is already complete, so both operands of every sum sit in their final places and nothing already written is ever revised.

The code keeps a reference to the row just finished. It opens the new row with the left edge 1, walks interior positions `j` computing `above[j - 1] + above[j]`, closes with the right edge 1, and appends. The edge 1s are what make the outermost interior cells well-defined: each has only one real neighbor above, and the implicit 1 outside the row supplies the other summand. Every row is symmetric, so its second half could be mirrored from the first, but with `numRows <= 30` halving an already tiny inner loop buys nothing.

The largest entry anywhere is the middle of the last row, C(29, 14) = 77,558,760, which fits comfortably in a 32-bit integer — no port needs a wider cell than the 32-bit rows it already builds, and no intermediate sum can overflow on the way there.

**Complexity:** `O(numRows²)` time, `O(numRows²)` space for the returned triangle — `O(1)` beyond it.
