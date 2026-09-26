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

![Clipping [0,2], [3,4], [5,7] against removal [1,6] keeps the head [0,1] from the first interval, drops fully covered [3,4], and keeps the tail [6,7] from the last.](figures/solution-clip-head-tail.svg)

**Complexity:** `O(n)` time over `n` intervals, `O(1)` space beyond the
output.
