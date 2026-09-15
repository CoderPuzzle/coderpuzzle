# Solutions — Form Array by Concatenating Subarrays of Another Array

The groups must land in `nums` as disjoint, in-order windows, so the only
freedom in the whole task is which occurrence of each group to take. That
freedom collapses to nothing: moving a group onto its earliest still-legal
occurrence never creates an overlap and only lengthens the suffix left for
the groups behind it, so one greedy sweep — earliest window first, cursor
advancing past each match — decides the question.

## Greedy earliest-match sweep

Keep a cursor `pos` marking the first index of `nums` still free. For each
group in order, walk start positions upward from `pos`; at each, compare the
window against the group element by element until a mismatch or a full
match. Take the first full match: if some valid assignment places this group
at a later start, that assignment's next window begins at or beyond the
later start's end, so the earliest occurrence leaves a suffix that contains
it — the choice is never wrong. Advance `pos` past the window and move on.

A group whose search runs off the end of `nums` fails immediately, since
every later group would have even less room; when every group is placed the
answer is `true`. Each start position costs at most one pass over the group,
so with `m` for the length of `nums` and `S` for the total group length the
sweep does `O(m · S)` work — a million comparisons at the stated bounds —
holding nothing but the cursor.

**Complexity:** `O(m · S)` time, `O(1)` space.
