# Solutions — Cat and Mouse II

The turns are alternating and the board never changes, so a position of this
game is fully described by three numbers: the mouse's cell, the cat's cell,
and whose turn it is. With at most 64 walkable cells that is 64 x 64 x 2 =
8192 positions — small enough to price every one of them outright, which
the 1000-turn cap makes necessary as well as convenient: some positions are
endless cat-and-mouse chases in which nobody ever eats, and their winner is
fixed by rule, not by play.

## Retrograde analysis over the state graph

Label the endings directly: mouse on food is a Mouse win; cat on food, or
cat on the mouse, is a Cat win. Every other state's fate then flows
backward from these through degree counting. Give each state a degree equal
to the number of moves its mover has — stay plus every landing cell of a
slide, stopping before the first wall in each direction — and process
labeled states in a queue. When a labeled state's predecessor sees that its
mover can jump into a state already won by that mover, the predecessor
inherits that win immediately (one good move is enough). Otherwise the
labeled successor retires one of the mover's options, and when the last
option dies the predecessor is the opponent's: all moves have been proven
losing. Positions never reached by any label are the draws — the mouse
survives forever without eating, and the game's rule that Mouse must reach
the food within 1000 turns hands exactly these to Cat, so unlabeled means
Cat wins. The 1000 itself never needs counting: the state graph is finite,
a forced win is discovered by propagation no matter how long the winning
line wanders, and only the unresolved residue — where no forced win exists
at any length — falls to the timeout.

Reverse edges come precomputed alongside the forward ones, so each state
enters and leaves the queue once. The answer is the label of the starting
state (mouse to move) — Mouse wins exactly when it was labeled a Mouse win.

**Complexity:** `O(R²C² · J)` states with `O(J)` transitions each, where
`J = R · C · maxJump` bounds a piece's landing cells — state honestly,
`R, C <= 8` keeps this in the low millions of cheap integer steps.
