# Solutions — Minimum Common Value

## Two-Pointer Intersection

The sorted precondition is the whole problem. Walk both arrays with one
pointer each: whenever the two front values differ, the smaller one can
never be matched later — everything still ahead of it on the other side
is even larger — so it is safe to drop. The first time the two fronts
tie, that value is common and, because every earlier candidate was
eliminated in order, no smaller common value exists; advancing either
side past a drain means that array ran out of possible matches and -1
closes the question.

This two-pointer sweep touches each element at most once, needs only the
two cursors beyond the inputs, and never stores anything proportional to
`n`. A hash set (hint 1) solves it equally well but pays `O(n)` extra
memory for membership; the linear walk keeps constant space while
honoring exactly the same bound.

**Complexity:** `O(n + m)` time, `O(1)` extra space.
