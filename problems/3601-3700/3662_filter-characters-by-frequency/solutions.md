# Solutions — Filter Characters by Frequency

## Count, then rebuild in place

A character's fate is decided by how often it occurs anywhere in `s`, so
the work splits into one pass to tally and one pass to keep. The tally fits
a fixed 26-slot array — the input is lowercase-only, so each character maps
to a plain offset from `'a'` and no hash map is needed. Any container works
at this scale; the array just makes the lookup a subtraction.

The second pass walks `s` left to right and appends exactly the characters
whose total count is strictly below `k`; a count of exactly `k` is dropped.
Scanning in the original order is what settles the ordering requirement for
free: kept characters emerge in their original relative positions without
any explicit bookkeeping, and when nothing qualifies the builder simply
stays empty.

The threshold check has to see every character of `s` at least once — a
single unread position could change both a count and its own inclusion —
so linear time is optimal. The tally occupies 26 counters no matter how
long `s` is, so the space beyond the output is constant.

**Complexity:** `O(n)` time, `O(1)` space.
