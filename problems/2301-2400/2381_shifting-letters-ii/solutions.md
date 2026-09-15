# Solutions — Shifting Letters II

## Difference array and prefix sums

Applying every shift to its range directly costs up to `O(n * q)` character updates, which is too slow for `5 * 10^4` shifts on a string of the same length. The key observation is that shifts commute: only the net shift of each position matters. Encode each shift as `+1` or `-1` at its start index and the opposite at `end + 1` in a difference array of length `n + 1` (the extra slot makes the end marker always in bounds). This records each shift in `O(1)`.

A running prefix sum over the difference array then yields the net shift for every index in one pass. Applying it is a single modular step per character: `(ord(c) - 97 + shift) % 26 + 97`. Python's `%` always returns a value in `[0, 26)` for a positive modulus, so backward shifts and wrap-around past `'z'` or before `'a'` are handled by the same expression with no case analysis.

The result is assembled from a list of characters with a single `join`, avoiding quadratic string concatenation. Overlapping and repeated ranges need no special treatment because the difference array simply accumulates their deltas.

**Complexity:** `O(n + q)` time, `O(n)` space.
