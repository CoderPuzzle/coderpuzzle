# Solutions — Video Stitching

## Greedy farthest-reach jumps

After sorting the clips by start, cover `[0, time]` the way a jump game would: maintain `covered`, the right end of the already-stitched prefix, and repeatedly ask which clip extends coverage the furthest. Among clips that start at or before `covered` (the only ones usable next), taking the one with the largest end is safe because any valid solution must include some clip crossing the current frontier, and the farthest-reaching such clip leaves the most room for every later choice — a clip it dominates can always be swapped out for it.

The mechanics use a single cursor `i` over the sorted list that never resets: the inner `while` advances it past every clip with `start <= covered`, updating `farthest` along the way. When the scan stops, either `farthest > covered`, in which case one more clip is counted and `covered` jumps to `farthest`, or `farthest == covered`, meaning no clip reaches past the current coverage — a gap that no later clip can bridge, so the answer is `-1`. Because `i` only moves forward, every clip is examined once across all iterations of the outer loop.

![The sorted clips on a time axis; the greedy takes [0,2], then [1,9], then [8,10].](figures/solution-clip-jumps.svg)

Edge cases are covered by the same test: if no clip starts at 0, the very first scan leaves `farthest == covered == 0` and returns `-1`; the final clip may overshoot `time`, which is fine since the loop exits as soon as `covered >= time`.

**Complexity:** `O(n log n)` time (the sort dominates the linear scan), `O(n)` space for the sorted copy.
