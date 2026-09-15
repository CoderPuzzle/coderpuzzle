# Solutions — Majority Frequency Characters

## Tally, then sweep the frequency buckets

Which characters travel together is decided purely by how often each occurs,
so the work splits into one pass to tally and one sweep to choose. The tally
fits a fixed 26-slot array — the input is lowercase-only, so each character
maps to a plain offset from `'a'` and no hash map is needed. A character
whose counter reads `c` belongs to the bucket for frequency `c`.

The choice sweep evaluates one candidate frequency at a time, gathering the
characters whose count equals it, and keeps the largest gathering seen.
Sweeping frequencies upward makes the tie rule fall out of a plain `>=`: a
later gathering of equal size necessarily sits at a higher frequency, which
is exactly the group the statement prefers. Because the sweep walks the 26
slots in ascending letter order, the winning characters are collected
already lexicographically sorted — the output order this judge pins falls
out of the scan for free.

Every character must be tallied at least once, so linear time is a floor;
the sweep adds only bounded-alphabet work on top (at most 26 slot
inspections per candidate frequency over at most `n` candidates). The
counters plus one buffer holding the winning group occupy space that does
not grow with `s`, so the extra space is constant.

**Complexity:** `O(n)` time, `O(1)` space.
