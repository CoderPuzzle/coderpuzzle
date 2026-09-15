# Solutions — Search in a Sorted Array of Unknown Size

## Exponential bound, then binary search

A binary search needs two fences, and the reader only hands out one for free: index `0` is the left end, but the right end is unknown. The sentinel makes the missing fence discoverable — `get(i)` returns `2147483647` past the end, which exceeds every real element, so "value below target" is a property that flips exactly once as `i` grows.

Probe exponentially: read `get(1)`, `get(2)`, `get(4)`, `get(8)`, … and stop at the first `hi` with `get(hi) >= target`. That probe is either a real element at least as large as the target or the sentinel; in both cases the strictly increasing order guarantees the target can only live in `[0, hi]`. Since `hi` doubles each step, this phase costs `log` of the final bound — at most fourteen calls for the 10⁴-element maximum.

The second phase is the textbook search inside `[0, hi]` for the smallest index whose value is at least `target`. If that value equals `target`, the index is the answer; a larger value (or the sentinel) means the target falls into a gap between elements and the answer is `-1`. Both phases are pure `get`-driven, so the whole run is about `2 · log n` calls — a rounding error against the 10 000-call budget, and the only strategy that stays logarithmic when `n` itself is secret.

**Complexity:** `O(log n)` time, `O(1)` space.
