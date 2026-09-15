# Solutions — Describe the Painting

## Difference-Map Coordinate Sweep

The mixed color sum is piecewise constant along the number line and can change only where a segment starts or ends. So each segment contributes a difference event — `+color` at its start, `-color` at its end — accumulated in a dictionary keyed by coordinate. Sweeping the sorted event coordinates while maintaining a running sum yields the painting: between two consecutive event coordinates the active segment set is fixed, and the running sum is exactly the sum of the currently active colors.

One subtlety is why emitting a piece at every event coordinate is minimal rather than merely correct. Colors are distinct across segments, so at any coordinate where events occur, the pluses and the minuses involve disjoint color values and their net can never be zero — the sum genuinely changes. Numeric equality between adjacent output pieces is still possible (as in example 3, where `{5,7}` and `{1,11}` both sum to 12), but those pieces must remain separate because the underlying color sets differ, which the sweep handles automatically by construction.

The walk adds `diff[keys[i]]` when leaving each coordinate, then emits `[keys[i], keys[i+1], running]` only when the running sum is positive. That guard skips unpainted gaps, where no segment is active and the sum sits at zero, and also drops the trailing stretch after the last event. Since keys emerge from the sort in ascending order, the output is already sorted by left endpoint as this judge requires. Zero-length output intervals cannot occur because duplicate coordinates collapse into a single dictionary key.

**Complexity:** `O(n log n)` time, `O(n)` space.
