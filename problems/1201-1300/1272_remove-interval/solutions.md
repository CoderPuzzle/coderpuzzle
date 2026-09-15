# Solutions — Remove Interval

## Per-interval clipping

The removal touches each input interval independently, and a single
removal interval can split any one of them into at most a head piece and
a tail piece — never more. So classify every `[start, end)` in one pass:
disjoint from `[removeStart, removeEnd)` means keep it whole; otherwise
emit the head `[start, removeStart)` when `start < removeStart` and the
tail `[removeEnd, end)` when `end > removeEnd`. A fully covered interval
emits nothing. Because the inputs are sorted and disjoint, emitting in
input order keeps the output sorted and disjoint for free.

**Complexity:** `O(n)` time over `n` intervals, `O(1)` space beyond the
output.
