# Solutions — Count Days Without Meetings

## Sorted-interval sweep

Every meeting blocks an inclusive range of days, so only the union of those
ranges matters — overlaps and duplicates collapse into it. Sorting the
intervals by start day lets one sweep fold them into the furthest
`lastEnd` reached so far: whenever a meeting starts beyond that frontier,
the days strictly between `lastEnd` and its start are uncovered and join the
free count; otherwise (or in any case) the frontier extends to the larger of
its own end. After the sweep, every day past `lastEnd` is free, so one final
subtraction from `days` closes the count.

The sort dominates at `O(n log n)` time for `n = meetings.length`, with a
constant-size state machine after it; no auxiliary structure beyond the sort
is needed, so space is `O(log n)`–`O(n)` depending on the language's sort.
Sorting mutates the input array, which the statement places no constraint
against.

All values stay within `1 <= x <= 10⁹`: gap sums and the final answer can
never exceed `days <= 10⁹`, inside signed 32-bit range; JavaScript doubles
are exact far below `2⁵³`.

**Complexity:** `O(n log n)` time, `O(1)` extra space beside the input sort.
