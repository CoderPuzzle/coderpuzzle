# Solutions — Minimum Lights to Illuminate a Road

## Difference array and greedy sweep

Mark all positions illuminated by existing bulbs with a difference array. Then
sweep from left to right. When an uncovered position `i` is found, install a
bulb as far right as possible while covering `i`, which is at `i + 1` (or at
the last position when `i + 1` is out of range).

That placement covers `i` through `i + 2`, so mark those positions and
continue. This greedy is optimal because every additional bulb has the same
fixed radius.

**Complexity:** `O(n)` time, `O(n)` space.
