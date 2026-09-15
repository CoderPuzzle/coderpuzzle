# Solutions — Determine if a Cell Is Reachable at a Given Time

## Chebyshev distance with a start-on-target special case

Every second the walker changes each coordinate by at most 1 (the
adjacent cells are the 8 surrounding ones, i.e. king moves), so after t
seconds the total progress toward the target in either axis cannot
exceed t. The Chebyshev distance `max(|sx - fx|, |sy - fy|)` is exactly
how many king moves a shortest walk spends, and greedily moving
diagonally while both coordinate gaps are positive reaches it in that
many seconds; therefore for distinct cells the answer is true precisely
when `t` is at least that distance.

Surplus seconds never hurt when the two cells differ: replacing one
diagonal step of the greedy walk with its two orthogonal components
costs one extra second with unchanged displacement, and once on the
target every further pair of seconds can be spent stepping to a
neighbor and back. Combined these absorb any `t >=` distance.

The degenerate case needs care because zero moves are already enough:
with `(sx, sy) == (fx, fy)`, `t = 0` succeeds immediately, `t = 1`
fails since a move is forced every second, and every `t >= 2` succeeds
by such an out-and-back excursion (odd surpluses included, e.g. via the
3-step loop through two adjacent cells). All arithmetic stays within
signed 32-bit range: coordinates are at most `10⁹`, so each absolute
difference is at most `10⁹ - 1`.

**Complexity:** `O(1)` time, `O(1)` space.
