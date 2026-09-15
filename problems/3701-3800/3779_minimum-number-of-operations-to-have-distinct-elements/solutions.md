# Solutions — Minimum Number of Operations to Have Distinct Elements

The operation only ever removes a three-element prefix, so the whole process
is decided by where the final duplicate-free suffix begins.

## Pointer with suffix duplicate counts

Keep a count of every value in the whole array plus `duplicated`, the number
of distinct values whose count is still two or more — the suffix starting at
the pointer is duplicate-free exactly when `duplicated` reaches zero. While
duplicates remain, one operation advances the pointer by three, and only the
three removed values can change any count; a value whose count drops to one
stops being duplicated, so `duplicated` is refreshed in constant time per
removed element. When the pointer reaches the end, the final operation that
emptied the array has already been counted, because the loop performs the
short last removal and then exits with an empty suffix.

The single pass over the array to build the counts and the linear total work
of the removals give `O(n)` time; the map of counts is `O(distinct)` space,
bounded by `O(n)`.

**Complexity:** `O(n)` time, `O(n)` space.
