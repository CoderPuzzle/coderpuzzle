# Solutions — N-Repeated Element in Size 2N Array

## Hash set, first repeat wins

All but one of the `n + 1` distinct values occur exactly once, and only the
repeated element has a second occurrence anywhere. That makes "the first value
seen for the second time" name the answer outright: a once-only value can never
collide with anything, so the very first collision the scan meets can only
involve the `n`-times value.

The pass walks `nums` left to right with a hash set of the values met so far,
testing each element for membership before inserting it, and returns on the
first hit — in Example 2 the third element, the second `2`, is already in the
set and settles the answer immediately. The tail return is unreachable, as the
statement promises `n >= 2` copies of one value across `2 * n` slots, which
guarantees a collision before the array is exhausted.

The stop is in fact much earlier than the end. Only `n + 1` distinct values
exist, so by the pigeonhole principle any `n + 2` consecutive positions must
hold an equal pair, and every equal pair involves the repeated value — the scan
always finishes within the first `n + 2` positions, never needing the array's
full `2 * n` length.

**Complexity:** `O(n)` time, `O(n)` space.
