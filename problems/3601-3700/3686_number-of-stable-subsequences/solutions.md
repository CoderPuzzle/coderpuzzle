# Solutions — Number of Stable Subsequences

## Trailing-run dynamic programming

A subsequence can fail in exactly one way: three same-parity elements landing
back to back. So the only history that matters when a new element arrives is
the parity of a subsequence's last element and how many elements of that
parity already trail it — one or two, since a trailing run of three would
already be unstable. Four counters therefore summarize everything built so
far: subsequences ending in an even run of length 1 or 2, and ones ending in
an odd run of length 1 or 2.

Each element touches only the pair of counters carrying its own parity. An
incoming even value can open a fresh one-element subsequence, follow any
odd-ending subsequence (the trailing even run restarts at 1), or follow an
even-ending subsequence whose run is still 1, promoting that counter to 2;
following an even run of 2 is precisely the forbidden move. Subsequences that
skip the element keep their counters, so each update reads only the old
values before either of them lands. One linear pass over `nums` leaves the
answer as the sum of the four counters.

Every update adds at most four residues below `10^9 + 7` before one
reduction, so 64-bit integers are safe in the fixed-width languages, and all
arithmetic stays non-negative — nothing is ever subtracted — so no language's
remainder semantics need repair.

**Complexity:** `O(n)` time, `O(1)` space.
