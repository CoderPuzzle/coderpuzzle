# Solutions — Score of a String

## Adjacent ASCII differences

The definition is a direct fold over neighboring pairs: walk `s` from
the second character on, take the absolute difference of the ASCII codes
of each character and its predecessor, and accumulate. Absolute values
matter only because a descending step like `'z'` to `'a'` would
otherwise subtract from the sum instead of adding.

Nothing needs storage beyond the running total: every pair is examined
exactly once, left to right.

**Complexity:** `O(n)` time, `O(1)` space.
