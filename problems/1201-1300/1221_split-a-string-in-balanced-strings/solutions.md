# Solutions — Split a String in Balanced Strings

## Cut at every zero crossing of the running balance

Track a running counter over the string: `+1` for `L`, `-1` for `R`. A prefix
is balanced exactly when this counter returns to zero, and any split into
balanced pieces is a union of such zero-crossings — so the greedy that cuts
whenever the counter hits zero is optimal.

Why nothing is lost: the pieces of any valid split each start and end at
counter value zero, and between two consecutive cuts the counter is the
sum over that piece. Cutting at _every_ zero can only refine a coarser valid
split, and refinement never decreases the piece count. Each cut is also the
earliest possible end of a balanced piece starting after the previous cut,
so no alternative can produce more pieces.

The answer is the number of times the balance returns to zero.

**Complexity:** `O(n)` time, `O(1)` space.
