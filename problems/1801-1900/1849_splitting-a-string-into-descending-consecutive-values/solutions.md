# Solutions — Splitting a String Into Descending Consecutive Values

Once the first piece is fixed, the entire split is forced: every
subsequent piece must read as exactly `prev - 1`, so there is nothing to
search over except where each next piece ends. Leading zeros are the only
wrinkle — `"05"`, `"005"`, and `"5"` all denote 5, so several cut
positions can share one value and each must be tried. The `n <= 20`
bound makes this enumeration tiny.

## Backtrack on forced successor pieces

Try each first piece `s[0:first_end]` for `first_end < min(n, 11)`. From
a position with previous value `prev`, extend a running number digit by
digit: when it equals `prev - 1`, recurse from the new position; once it
exceeds `prev - 1` (or dips below zero), that branch dies. The running
value is rebuilt incrementally rather than re-parsed per length, so no
piece ever costs more than its digits. A first piece of eleven or more
digits is skipped outright — its successor alone would need ten of the at
most nine leftover characters, which also keeps every computed value far
inside 64-bit range.

Each position branches only over lengths whose value matches the forced
successor, and the recursion consumes the string monotonically, giving a
handful of live branches per level.

**Complexity:** exponential in theory but effectively `O(n²)` branching
per first piece here — bounded by `n <= 20` — with `O(n)` recursion depth
and space.
