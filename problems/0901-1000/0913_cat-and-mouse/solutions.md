# Solutions — Cat and Mouse

A position of the game is the pair of locations plus whose turn it is — at
most 2n² positions on n nodes. The draw rule says a repeated position ends
the game, so every position is played at most once and the game is a finite
three-valued minimax over a tiny state graph, not an unbounded chase. That
observation also names the algorithm: evaluate positions backward from the
two terminal families (the Mouse at the hole, the Cat on the Mouse) and let
everything the backward pass cannot reach stay a draw.

## Retrograde analysis over positions

Encode each position as `(mouse, cat, turn)` with a mark in {Mouse, Cat,
undecided}, and a per-position move count: the number of successors still
undecided — `len(graph[mouse])` when the Mouse moves, the count of the Cat
node's neighbors excluding the hole when the Cat moves. Seed a queue with
the terminals: Mouse at node 0 marks a Mouse win, coinciding locations mark
a Cat win, both regardless of turn. Then propagate backwards: when a marked
position is popped, visit its predecessors — the positions whose mover steps
into it. If the mark favors the predecessor's mover, the mover has found a
winning move, so the predecessor takes that mark at once; otherwise the move
just counted against the mover, and when its last undecided successor
disappears the mover has no escape and the predecessor takes the opponent's
mark. Both rules mirror optimal play: a mover wins as soon as any move wins,
and loses only when every move loses.

The queue settles each position at most once, so the pass is breadth-first
and iterative — no recursion over a 5000-position space. Whatever remains
unmarked at the fixpoint is a draw: a player who cannot force a win can keep
play inside the unmarked region, and since positions are finite a repeat —
the draw condition — eventually happens. The answer is the mark of the
initial position `(1, 2, mouse to move)`, defaulting to 0 while unmarked.

**Complexity:** `O(n²·deg)` time, `O(n²)` space.
