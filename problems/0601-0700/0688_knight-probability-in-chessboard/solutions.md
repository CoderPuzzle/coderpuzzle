# Solutions — Knight Probability in Chessboard

## Probability-mass dynamic programming

Following one randomly walking knight means exploring a tree of `8^k` move
sequences, but every sequence that survives `t` steps and ends on the same
cell contributes the same `8^-t` to the answer — so the walk can be tracked
in aggregate. Keep a board where `board[r][c]` is the probability of
standing on `(r, c)` after the moves made so far: it starts with `1.0` on
`(row, column)` and nothing anywhere else. Each move splits every cell's
mass into eight equal parts and sends one part along each knight move; the
parts addressed off the board are exactly the walks that stop early, so
they are simply dropped. After `k` such steps the answer is the total mass
left on the board.

Each step is one sweep: for every cell in row-major order, gather the eight
incoming contributions in a fixed move order, dividing each term by `8.0`
as it is added, and write the sum to the next board. That discipline is not
just cosmetic — the judge compares the returned double exactly, and the
arithmetic here is built so every language produces the same bits: division
by `8.0` is a power-of-two scaling and rounds nothing, and IEEE-754
additions in one fixed order round identically everywhere. A different
gathering order could shift the last bits of the large `n = 25`, `k = 100`
answers, so the move order stays pinned in every implementation.

On the first example (`n = 3`, `k = 2`, corner start) the first sweep leaves
`2/8` on board — only the moves to `(1, 2)` and `(2, 1)` stay — and each of
those cells again keeps two of its eight moves, so the answer is
`0.25 * 0.25 = 0.0625`. The edges need no special cases: `k = 0` never
enters the sweep and returns the untouched `1.0`, and boards where every
move leaves (a `1 x 1` board, or the center of a `3 x 3`) simply drain to
`0.0`.

**Complexity:** `O(k·n²)` time, `O(n²)` space.
