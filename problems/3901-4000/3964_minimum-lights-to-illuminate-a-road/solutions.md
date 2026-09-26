# Solutions — Minimum Lights to Illuminate a Road

## Difference array and greedy sweep

Mark all positions illuminated by existing bulbs with a difference array. Then
sweep from left to right. When an uncovered position `i` is found, install a
bulb as far right as possible while covering `i`, which is at `i + 1` (or at
the last position when `i + 1` is out of range).

![On lights = [0, 0, 0, 0] the sweep installs at 1 for the first dark cell i = 0 and clamps to 3 for i = 3, so the spans [0, 2] and [2, 3] overlap only at position 2 and 2 bulbs suffice.](figures/solution-greedy-bulb-sweep.svg)

That placement covers `i` through `i + 2`, so mark those positions and
continue. This greedy is optimal because every additional bulb has the same
fixed radius.

**Complexity:** `O(n)` time, `O(n)` space.
