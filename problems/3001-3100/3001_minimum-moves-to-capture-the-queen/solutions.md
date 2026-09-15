# Solutions — Minimum Moves to Capture The Queen

## Attack-line enumeration

The queen never moves, so the only question is whether some white piece
already attacks her. The answer is `1` exactly when the rook shares the
queen's rank or file, or the bishop's coordinate differences to the queen
are equal in size (a diagonal) — and in each case the line between them is
empty. Empty is the subtle part: every square on board is vacant except the
three pieces, so the _other_ white piece is the only possible blocker. The
bishop cancels the rook's attack only if it stands on that same rank or file
strictly between them; the rook cancels the bishop's attack only if it lies
on that same diagonal segment strictly between them — a diagonal square like
any other, so this genuinely happens. A few integer comparisons enumerate all
of this in constant time; if no unblocked attack exists the answer is `2`.

Two moves always suffice. If a piece attacks but its line is blocked, move
the blocker aside first: any bishop move abandons both its rank and its file,
which clears a rook line completely, and any rook move steps off the single
diagonal it was sitting on, which clears a bishop line — then capture with
the freed piece. If neither piece attacks, stage the rook once and capture
with it second: sliding it along its own file to the queen's rank, or along
its own rank to the queen's file, sets up an unobstructed capture unless the
bishop sits exactly on the staging path or the resulting line. Both stagings
fail together only if the bishop would have to occupy two squares at once, or
the rook's own square, or the queen's square — impossible — so one of them
always lands clean.

**Complexity:** `O(1)` time, `O(1)` space.
