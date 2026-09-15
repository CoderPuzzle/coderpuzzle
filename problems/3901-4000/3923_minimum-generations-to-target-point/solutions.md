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

**Complexity:** `O(7⁶ * iterations)` time, `O(7³)` space.
