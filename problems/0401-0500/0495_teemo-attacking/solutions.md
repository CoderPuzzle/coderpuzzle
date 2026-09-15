# Solutions — Teemo Attacking

## Clamped gaps plus the last window

Every attack paints `duration` seconds of poison, but an attack that lands
before the previous window has finished resets the timer: the seconds the old
window would still have covered are covered again by the new one, so counting
them twice is the only mistake available. Attack `i` therefore contributes
exactly the part of its window that elapses before the next attack,
`min(duration, timeSeries[i + 1] - timeSeries[i])` — the full `duration` when
the gap is wide enough, just the gap when the window is cut short by a reset.

Because `timeSeries` arrives sorted, one left-to-right pass adds those clamped
gaps, and the last attack, never followed by another, contributes its full
`duration`. Nothing beyond a running total is kept — no window list, no second
pass, and the two statement examples fall out directly: `[1,4]` with
`duration = 2` pays `min(2, 3) = 2` plus the final `2`, and `[1,2]` pays
`min(2, 1) = 1` plus `2`.

The obvious worry, `n * duration` reaching `10⁴ × 10⁷ = 10¹¹`, never
materializes: `timeSeries[i] <= 10⁷` pins the whole poisoned span inside
`[0, t_max + duration - 1]`, so the answer tops out at `2 × 10⁷` and every
partial sum sits below it — comfortably inside 32-bit range. The accumulation
still runs in 64 bits in the fixed-width languages: the clamp keeps each term
small, and widening the total costs nothing while making the code independent
of that bound argument.

**Complexity:** `O(n)` time, `O(1)` space.
