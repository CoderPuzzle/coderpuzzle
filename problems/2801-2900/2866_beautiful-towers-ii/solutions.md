# Solutions — Beautiful Towers II

## Monotonic-stack prefix/suffix DP

A beautiful configuration's peak index `i` splits the sum into two
independent halves: the best non-decreasing prefix ending at `i` and the
best non-increasing suffix starting at `i`. Each half is maximized by
clipping every tower to the running minimum of `maxHeights` toward `i`,
because any taller tower would have to shrink anyway and every value is
positive. Recording both halves for every index as `left[i]` and
`right[i]`, the answer is the largest `left[i] + right[i] - maxHeights[i]`
over all candidate peaks, where the peak's own height is subtracted once
because both tables count it.

A monotonic stack of indices fills each table in one sweep: popping every
strictly taller index before `i` leaves `j`, the nearest index with
`maxHeights[j] <= maxHeights[i]`. Every tower between `j` and `i` exceeds
the new peak and clips to it, while the prefix up to `j` already holds its
own best mountain, so `left[i] = left[j] + maxHeights[i] * (i - j)` — and
`right[i]` follows symmetrically from the right. Each index is pushed and
popped at most once per sweep, so both tables and the final combining pass
are linear.

Widths stay bounded: an answer is at most `n * max(maxHeights[i]) = 10^5 *
10^9 = 10^14`, past the signed 32-bit range, so the fixed-width languages
accumulate the tables in 64-bit integers; JavaScript/TypeScript keep exact
doubles throughout because every sum stays below `2^53`.

**Complexity:** `O(n)` time, `O(n)` space — two stack sweeps plus one
combining pass over the two tables.
