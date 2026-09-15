# Solutions — Escape The Ghosts

## One Manhattan race per ghost

The grid is empty and every actor covers exactly one unit per turn, so the
only currency in this game is the Manhattan distance: the runner needs
`|target|` turns to arrive, and ghost `i` needs `|ghosts[i] - target|` turns
to stand on the target. Everyone is equally fast, nobody is ever blocked, and
the ghosts answer every plan with a plan of their own — which pins the whole
question to a single race: does the runner's beeline to the target beat every
ghost's beeline to the same square?

If the runner's distance `d` is strictly smaller than every ghost's distance
to the target, the beeline wins outright. At turn `t` the runner stands on a
point `p` with `|p - target| = d - t`, and a ghost meeting it there would
satisfy `|ghost - target| <= |ghost - p| + |p - target| <= t + (d - t) = d`,
contradicting a start strictly farther than `d`. So no ghost can share any
square with the runner — in particular the target — at any turn up to and
including the arrival, and the tie rule never even comes into play.

Conversely, if some ghost starts within `d` of the target, that ghost can
ignore the runner completely, walk straight to the target, and wait: it has
been standing there since its own arrival turn, which is no later than the
runner's earliest possible turn `d`. Arriving together — or stepping onto a
waiting ghost — is not an escape, so the answer is `false`. The verdict is
therefore exactly `d < |ghosts[i] - target|` for every ghost: one
absolute-difference sum per ghost against the runner's own, and nothing to
simulate.

**Complexity:** `O(g)` time, `O(1)` space.
