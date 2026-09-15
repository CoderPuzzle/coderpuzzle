# Solutions — Pairs of Songs With Total Durations Divisible by 60

## Remainder buckets in one pass

Whether a pair sums to a multiple of 60 depends only on the two durations modulo 60: remainders `r` and `s` pair up exactly when `r + s` is 0 modulo 60. So instead of comparing songs, count songs by remainder in a fixed 60-slot array.

The pass processes songs left to right so that each pair is counted once, at its later member. Before recording the current song's remainder `r`, the code adds `counts[(60 - r) % 60]` — the number of earlier songs whose remainder completes `r` to a multiple of 60 — and only then increments `counts[r]`. The `(60 - r) % 60` form matters at the self-complementary classes: for a remainder of 0 the complement is bucket 0 itself, so songs of length exactly 60 pair with each other, and remainder-30 songs likewise pair among themselves, all without any special-casing.

A list with no compatible pair simply accumulates zeros and returns 0; there is no minimum-length concern beyond the loop's own structure.

**Complexity:** `O(n)` time, `O(1)` space for the fixed-size 60-slot array.
