# Solutions — Minimum Number of Taps to Open to Water a Garden

## Greedy Farthest-Reach Coverage

Each tap i becomes the interval `[i − ranges[i], i + ranges[i]]`, clamped to `[0, n]` so water spilled beyond the garden doesn't matter. The task is the classic minimum-interval-cover of `[0, n]`: pick as few intervals as possible whose union spans the whole segment.

The greedy keeps `covered`, the farthest point known to be watered, and repeatedly asks: among all intervals that start at or before `covered` (i.e., that connect to the already-watered prefix), how far can the watering be extended? It takes that maximum reach as the new `covered` and counts one more tap — the jump-game argument shows this is optimal, since any solution must include some interval crossing the current boundary, and choosing the farthest-reaching one leaves the most room for the remaining cover. If no interval starts at or before `covered`, there is an unwatered gap and the answer is −1.

![Each tap's watering arc over the garden; tap 1 alone spans [0, 5].](figures/solution-tap-arcs.svg)

The intervals are sorted by left endpoint so the sweep is one pass: an index `i` advances over intervals as they become relevant and is never revisited, because once an interval's start exceeds the current `covered`, it will exceed every earlier `covered` value too. Taps with zero range are legitimate degenerate intervals (a single point), and the loop terminates the moment `covered` reaches `n`.

**Complexity:** `O(n log n)` time, `O(n)` space.
