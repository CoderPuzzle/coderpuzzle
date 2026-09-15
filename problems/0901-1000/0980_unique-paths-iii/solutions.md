# Solutions — Unique Paths III

A walk qualifies only by covering ground: it must leave the starting square,
step 4-directionally through squares it has not used, and reach the ending
square having stepped on every non-obstacle square exactly once — a
Hamiltonian path of the walkable squares, start and empties and end together.
Nothing cheaper than walking candidates can count these paths, and the
constraint `m * n <= 20` is what makes walking them all affordable: a walk is
at most twenty squares long, and its visited set fits in one integer.

## Backtrack with a visited bitmask

One scan finds the starting square and builds `full`, the bitmask holding
bit `r * n + c` for every non-obstacle square — the exact set of squares a
counted walk must cover. From the start, with its bit already set, a
depth-first search tries each of the four neighbours in turn: a neighbour
qualifies when it is inside the grid, is not an obstacle, and has its bit
still clear, and the recursion continues with that bit set. Backtracking is
free — the mask travels as a value, so returning from a call restores the
caller's visited set without any un-marking step.

Stepping onto the ending square is the moment of truth. No square may be
walked twice, so a walk that meets the ending square early can never return
to it — that walk is over whether it is complete or not — and the walk
counts exactly when its mask equals `full` at that step. Comparing two
at-most-20-bit integers is one machine word in every language. The
recursion never nests deeper than twenty calls, one per square on the
current walk, so the call stack is safely small in every language here; the
count itself also stays far inside 32 bits, being a count of walks over at
most twenty squares.

**Complexity:** `O(4^(m*n))` time, `O(m*n)` space.
