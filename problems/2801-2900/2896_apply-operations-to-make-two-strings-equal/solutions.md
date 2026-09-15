# Solutions — Apply Operations to Make Two Strings Equal

## Pair the mismatches, keep one credit

Compare the two strings position by position: only the indices where `s1`
and `s2` disagree need a net flip, and every position that already matches
is best left untouched forever. Both operations flip exactly two positions,
so the number of mismatched positions must be even — otherwise the strings
can never be made equal and the answer is `-1`.

Think of an optimal plan as matching the mismatched positions up in pairs.
A pair at positions `a < b` is fixed either by one arbitrary-pair flip,
costing `x`, or by a chain of `b - a` adjacent flips walking the gap,
costing `b - a` — every position strictly between the two ends flips twice
and cancels out. A pair, however, need not join neighboring mismatches:
when `x` is small, an x-pair spanning two far-apart mismatches can enclose
an adjacent chain joining a tight pair in the middle, and that nested plan
can undercut every consecutive pairing (mismatches at `0, 100, 101, 300`
with `x = 5` cost `5 + 1 = 6` nested, but `10` any consecutive way). So the
scan carries one bit of state: whether an already-paid x-op is waiting for
its free partner, and that credit is allowed to stay open while other pairs
are settled. At each mismatch either a pending credit closes for free, a
new credit opens for `x`, or the current and next mismatches form a pair
costing `min(x, gap)` — with a credit open that pair simply happens inside
it. One linear pass over the mismatch list with these transitions yields
the minimum total, and an even mismatch count guarantees the final state
has nothing pending.

The cost never exceeds `n / 2` pairs at price `x`, i.e. `250 * 500 =
125000`, so plain 32-bit integers (and JavaScript's `number`, exact far
below 2⁵³) are safe throughout.

**Complexity:** `O(n)` time, `O(n)` space.
