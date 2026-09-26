# Solutions — Minimum Generations to Target Point

## Fixed-point relaxation

Coordinates are integers from `0` through `6`, so there are at most `7³ = 343`
possible points. A midpoint is always an integer in the same coordinate
range. Keep the earliest generation at which each point becomes available;
initial points have generation `0`.

Repeat relaxation over all pairs of available points. A pair can generate a
midpoint only after both endpoints are available, so its generation is one
more than the larger endpoint generation. The relaxation terminates when no
point improves.

![On Example 2's points [0, 0, 0] and [5, 5, 5] with target [1, 1, 1], generation 1 adds 2 = mid(0, 5) and generation 2 adds 1 = mid(0, 2) and 3 = mid(2, 5), so the target first appears at k = 2.](figures/solution-generation-numberline.svg)

**Complexity:** `O(7⁶ * iterations)` time, `O(7³)` space.
