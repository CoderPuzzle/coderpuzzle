# Solutions — Design Tic-Tac-Toe

## One counter per line, four touched per move

A win is announced the moment it happens, and the only lines that could have
just completed are the ones running through the played square: its row, its
column, and whichever of the two diagonals contains it. So the class never
stores the board at all — it keeps, per player, a count of that player's
marks on every row, on every column, and on each diagonal. A `move` bumps
the row and column counters of `player`, adds to the main diagonal's counter
when `row == col` and to the anti-diagonal's when `row + col == n - 1`, and
declares `player` the winner exactly when one of the counters it just
touched reaches `n`. Since every move lands on an empty cell, a counter at
`n` can only mean `n` distinct cells of that one line, all owned by the same
player — nothing else needs checking.

Each move therefore does a bounded amount of work no matter how large the
board is: two array writes, up to two more for a diagonal square, and four
comparisons. In the example, player 1's row-2 counter climbs to 1, then 2,
and the closing `move(2, 1, 1)` takes it to 3 = n, which is why the win is
reported on that move and on none earlier. The construction allocates the
2 x n row and column counters plus the two diagonal scalars, which is also
the whole space bill.

**Complexity:** `O(1)` per move, `O(n)` space.
