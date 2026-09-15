# Solutions — Check Knight Tour Configuration

A knight tour configuration puts one visit number on every cell: visit
`t` records the cell occupied after `t` moves. Everything about validity
is therefore local to consecutive visits — visit `0` must sit on the
top-left cell, and visits `t - 1` and `t` must be a knight move apart.
Nothing else can be wrong: distinctness and the value range are already
guaranteed by the constraints.

## Inverse position walk

Build an inverse table that maps each visit number to the cell holding
it, scanning the grid once. Then walk the visits from `1` upward and
test each pair of neighbouring entries: with row delta `dr` and column
delta `dc` the move is a knight move exactly when `(dr, dc)` equals
`(1, 2)` or `(2, 1)`, checked as an arithmetic condition so no
enumerated offset table is needed. Any failing pair, or a nonzero value
on the top-left cell, rejects the whole board immediately.

Boards are tiny (`n <= 7`), so both passes run in microseconds; the
check touches every cell once plus every hop once. Iteration and helper
state are flat loops over preallocated arrays, so there is no recursion
anywhere on the path.

**Complexity:** `O(n²)` time, `O(n²)` space.
