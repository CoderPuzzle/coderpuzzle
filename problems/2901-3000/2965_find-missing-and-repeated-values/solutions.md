# Solutions — Find Missing and Repeated Values

The grid holds every value of [1, n²] exactly once except one value twice
and one value never, so a single tally over the n² cells pins down both
answers at once.

## Flag the duplicate, then find the unflagged value

Sweep the cells once with a boolean array over [1, n²]: flag each value as
it is seen, and the one value that arrives already flagged is the repeated
a. Afterward exactly one slot in [1, n²] is still unflagged — the missing
b. No arithmetic beyond counting to n² occurs, so every language runs this
in its native integer width with no overflow anywhere.

**Complexity:** `O(n²)` time, `O(n²)` space.
