# Solutions — Dota2 Senate

## Two queues of senator indices

Split the indices into a Radiant queue and a Dire queue in one pass over the
string. Each step the two fronts fight: the smaller index acts first in the
round-robin order, so it bans the other front — that senator is popped for
good — and re-enqueues itself at index + `n`, the position it occupies in the
next round's pass. Adding `n` rather than any other offset keeps both queues
sorted by current position, so the fronts are always the earliest still-living
senator of each party in the wrap-around order. When one queue empties, every
living senator belongs to the other party and it announces.

Every fight permanently removes exactly one senator, so at most `n - 1` fights
decide the senate and the loop terminates with one survivor queue.

Banning the nearest living opponent is each senator's best move: every living
opponent gets to act before this senator's next turn, whichever one is spared,
so sparing anyone only donates a full round of bans to the other party — and
among equally useful bans the nearest opponent is the one whose own turn comes
first. The queue duel is exactly that greedy: when the fronts are `r < d`,
every living Dire holds a current position of `d` or later, so `d` is
Radiant's nearest opponent, and symmetrically for `d < r`. Each senator enters
its queue once and is removed at most once, so the whole duel is linear.

**Complexity:** `O(n)` time, `O(n)` space.
