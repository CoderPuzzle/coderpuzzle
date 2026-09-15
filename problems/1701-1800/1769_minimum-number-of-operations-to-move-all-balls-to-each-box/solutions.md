# Solutions — Minimum Number of Operations to Move All Balls to Each Box

A ball travels between boxes `i` and `j` in exactly `abs(i - j)`
operations, one per adjacent hop, and the balls never interfere with
each other. Gathering every ball into box `i` therefore costs the plain
sum of distances from each occupied box to `i`, and the task is to
evaluate that sum for all `n` target boxes at once.

## Two passing sweeps

Instead of re-summing the distances for each target (the `O(n²)`
brute force), sweep the gather point across the row and track how its
running total evolves: moving the target one box to the right adds one
step for every ball at or left of the new target, exactly as a
left-to-right recurrence on the left-hand contributions. The pass
carries a running pair `(count, ops)`, where `count` is the number of
balls at or left of the current box and `ops` is the cost of gathering
just those balls into it. Each step first banks `ops` into `answer[i]`,
then absorbs the current box's ball into `count`, then adds `count` to
`ops` — which pushes the gather point one box further. A symmetric
right-to-left pass accumulates the right-hand contributions the same
way, and the two halves sum to the full distance total for each box.

On `"110"` the left pass contributes `[0, 1, 2]` and the right pass
`[1, 0, 1]`, giving `[1, 1, 3]`. With `n <= 2000` the largest possible
answer is the all-ones endpoint sum `1999 · 2000 / 2 = 1999000`, well
inside 32-bit range.

**Complexity:** `O(n)` time, `O(n)` space (the output array itself;
`O(1)` auxiliary).
