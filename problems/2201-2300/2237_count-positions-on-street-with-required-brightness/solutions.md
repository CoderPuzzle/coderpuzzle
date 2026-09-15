# Solutions — Count Positions on Street With Required Brightness

## Difference array over clamped light ranges

Each light covers a contiguous range of positions, but its radius may
reach past either end of the street, so both edges are clamped to `[0, n]`
before anything else. Writing `+1` at the range's start and `-1` just past
its end into a difference array records every light in constant time, and
a single prefix sum over the array then yields the brightness at every
position without ever comparing pairs of lights.

A second pass counts the positions whose running brightness meets the
requirement, giving the answer directly.

**Complexity:** `O(n + L)` time, `O(n)` space, where `L` is the number of
lights.
