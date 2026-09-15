# Solutions — Find the Score Difference in a Game

The rules read like two-player bookkeeping, but a game's outcome depends on
exactly one bit of state: which player is active when the points are scored.
The answer is a difference, so the player identity can ride on a sign.

## Signed-turn simulation

Carry a single sign `turn` through one left-to-right pass — `+1` while the
first player is active, `-1` while the second is. Each rule acts as a sign
flip applied in the stated order: odd points flip once, a 6th-game index
(`i mod 6 = 5`) flips once, and when both fire on the same game the two flips
undo each other — precisely the "swap, then swap again" of Example 2's game
5, where the second player stays active. After the flips settle, the active
player earns `nums[i]`, which enters the running total as
`turn * nums[i]`; summing these signed contributions is already the first
player's total minus the second player's total, so no per-player tallies are
ever kept.

The pass is plainly iterative — a single loop over at most 1000 games — so no
language risks stack depth. Width needs no care either: points lie in
`1..1000`, so each player's total is at most `1000 × 1000 = 10⁶` and the
difference stays within `±10⁶`, comfortably inside 32-bit integers in every
typed language, and exact in JavaScript's `number` far below 2⁵³. The sign
and the running difference are the only state.

**Complexity:** `O(n)` time, `O(1)` space.
