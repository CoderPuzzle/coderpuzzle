# Solutions — Maximum Number of Weeks for Which You Can Work

The schedule is blocked only by the project with the most milestones: two
milestones of the same project may never sit in consecutive weeks, so the
other projects' milestones act as separators that break up the largest
project's run. Let `total` be the sum of all milestones, `mx` the largest
single project's count, and `rest = total - mx` the total of every other
project.

## Separator bound

If `rest >= mx - 1`, every milestone of the largest project can be paired
with a separator from a different project, so no two of its milestones are
ever adjacent and all `total` weeks can be worked. Otherwise the largest
project simply has too many milestones for the others to split apart: the
best possible run alternates a separator with a largest-project milestone
(`2 * rest` weeks) and then takes one final largest-project milestone,
for `2 * rest + 1` weeks in total. Both cases collapse to the closed form
`min(total, 2 * rest + 1)`.

The scan computes `total` and `mx` in a single pass, then applies the
formula. The arithmetic uses 64-bit integers throughout: with `n <= 10⁵`
and each count `<= 10⁹`, `total` reaches `10¹⁴`, which exceeds a 32-bit
range but stays comfortably inside `2⁵³`, so JavaScript and TypeScript
compute it exactly with plain `Number`.

**Complexity:** `O(n)` time, `O(1)` space.
