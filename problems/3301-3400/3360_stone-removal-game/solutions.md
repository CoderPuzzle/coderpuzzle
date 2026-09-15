# Solutions — Stone Removal Game

## Direct simulation

The rules leave no choices: on every turn exactly one move is legal in
principle, namely removing the current size (10 on Alice's first turn,
then one fewer each turn), and the only open question is whether the pile
is still large enough to pay for it. So the whole game is a single walk —
subtract the current removal size while it fits, shrink the size by one,
and flip whose turn it is. The walk stops at the first turn whose removal
size exceeds the remaining pile; that player cannot move and loses, so
Alice wins exactly when the stuck player is Bob.

The removal sizes shrink toward zero, and with `n <= 50` the walk ends
after at most ten turns in practice (the sizes 10 + 9 + … + 1 already sum
to 55), so nothing else is needed — no search over alternatives exists to
branch on. The parity flip does all the bookkeeping: when the loop exits,
`aliceToMove` tells who is stuck, and the answer is its negation.

**Complexity:** `O(√n)` time (the walk lasts until 10 + 9 + … exceeds
`n`), `O(1)` space.
