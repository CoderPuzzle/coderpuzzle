# Solutions — Unique Substrings in Wraparound String

## Longest run per ending letter

What lives in `base` is exactly the runs of consecutive alphabet letters —
every character the successor of the one before it, wrapping `z` back around
to `a`. Such a run is pinned by two facts alone, its last letter and its
length, because the ending letter forces everything ahead of it: the
character before `c` must be `c`'s predecessor, and so on back to the start.
Distinct substrings of `base` are therefore distinct (last letter, length)
pairs, and counting them never requires building a substring.

The scan keeps `run`, the length of the run of consecutive letters ending at
the current position: it grows by one when the incoming character is the
alphabet successor of the previous one (`z -> a` counts as succession) and
resets to 1 at every break. Each position updates `best[c]`, the longest run
seen ending at letter `c` — and that maximum is precisely the dedup the
statement demands. A longer run ending at `c` has as its suffixes every
shorter run ending at `c`, so keeping only the longest counts each distinct
substring ending at `c` exactly once.

A run of length `L` contributes exactly its `L` suffixes — all runs, all
ending at the same letter, all distinct — and no substring can end at two
different letters, so the answer is simply the sum of the 26 maxima.

**Complexity:** `O(n)` time, `O(1)` space — 26 counters.
