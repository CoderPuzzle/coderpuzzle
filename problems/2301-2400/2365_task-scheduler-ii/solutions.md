# Solutions — Task Scheduler II

## Greedy earliest completion with a last-day map

Breaks should be taken as late as possible. Delaying the current task
cannot make any later task finish sooner — every subsequent day only moves
forward — so the optimal schedule completes each task on the earliest day
its constraint allows. That greedy is safe precisely because the tasks run
in a fixed order: pushing work earlier never violates someone else's
spacing, it only relaxes it.

The simulation then needs one number per task type: the last day that type
ran. Walking `tasks` in order, keep the clock at the current day; for each
task, the next legal day is one past today, unless its type ran recently,
in which case the clock jumps straight to `last[type] + space + 1` — all
the skipped days are breaks taken in one leap. Recording the completion day
per type in a hash map makes each step constant time.

Day totals can reach roughly `n * (space + 1) ≈ 10⁵ × 10⁵ = 10¹⁰`, which
overflows 32-bit integers, so fixed-width languages carry the clock and the
last-day map in 64 bits.

**Complexity:** `O(n)` time, `O(n)` space.
