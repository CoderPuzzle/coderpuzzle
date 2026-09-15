# Solutions — Count the Number of Special Characters II

## Last-lower versus first-upper positions

The ordering condition has an exact positional restatement: a letter is
special precisely when its last lowercase index comes strictly before its
first uppercase index. Both endpoints are captured in one linear scan — a
lowercase character always refreshes its letter's `last_lower` entry, while
an uppercase character only records into `first_upper` when that slot is
still unset, so the _first_ uppercase position survives later repeats.
Afterwards each of the 26 letters is judged with a two-slot comparison.

Recording extremes (rather than re-scanning or streaming disqualification)
keeps every letter's verdict independent of how often it alternates case:
extra occurrences in either case before or after the recorded pair cannot
change the comparison. The single pass over the `n` characters dominates the
cost, and only two fixed 26-entry arrays are allocated.

**Complexity:** `O(n)` time, `O(1)` space.
