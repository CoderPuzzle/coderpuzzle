# Solutions — Push Dominoes

## Two-pass force accumulation

Instead of simulating seconds, each position accumulates a signed force. Scanning left to right, a domino pushed right (`R`) sets the force to a large sentinel `n`; a domino pushed left (`L`) kills the force to 0; otherwise the force decays by one per step away from its source, never below zero. This assigns every position a rightward force equal to `n` minus its distance from the nearest `R` on the left (when that push reaches before any `L` interrupts it). The values themselves never matter — only their comparison.

A mirror scan right to left computes the leftward force with `L` as the source and `R` as the blocker, and subtracts it from the running total. Each position now holds the difference between the rightward and leftward pushes reaching it: strictly positive means the `R` push is strictly closer (or unopposed) so the domino falls right, strictly negative means it falls left, and exactly zero means the forces balance — either two equal and opposite pushes meet at that domino, or nothing reached it at all — and it stays vertical.

![Both force passes over ".L.R...LR..L": each '.' falls toward the nearer push, ties stay upright.](figures/solution-domino-forces.svg)

The initial pushes (`R` and `L` positions) are handled by the same rules: an `R` gets the full sentinel on the first pass and zero opposing force on the second, so it reads back as `R`; an untouched `.` far from any push gets zero from both passes. One final join maps signs back to characters.

**Complexity:** `O(n)` time, `O(n)` space.
