# Solutions — Take K of Each Character From Left and Right

## Longest Keepable Sliding Window

Taking from the two ends is the mirror image of keeping one contiguous
middle: if the kept stretch runs from index `l` to `r`, the minutes spent
are exactly `l + (n − 1 − r) + ... ` — in other words, every split into
taken ends corresponds to one preserved substring, and minimizing minutes
is maximizing what stays. The take reaches `k` copies of letter c exactly
when the kept middle holds at most `total_c − k` of them, so the task
becomes: find the longest window whose per-letter counts stay within those
caps (which are fixed once and for all from a single frequency pass; any
letter whose total is below `k` makes the whole request impossible, giving
the `-1` branch).

The caps only shrink never-grow with window position, so a sliding window
sweeps the optimum in linear time: extend `right` one letter at a time,
then advance `left` just until the window is back under every cap — each
pointer crosses the string at most once. The final answer is
`n − bestWindow`, zero when nothing needs to be taken (`k = 0`).

**Complexity:** `O(n)` time, `O(1)` space.
