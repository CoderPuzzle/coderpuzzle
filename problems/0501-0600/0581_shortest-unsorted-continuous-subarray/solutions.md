# Solutions — Shortest Unsorted Continuous Subarray

Both approaches turn on the same fact: outside the reorder window, every
element already sits exactly where a fully sorted array would put it. Sort
a copy, line it up against the original, and the first and last positions
that disagree are the window's two edges — a direct reading that pays
`O(n log n)` for the sort and keeps a copy of the array alive beside it.
The running extremes find the same two edges without sorting: a pass
forward carrying the prefix maximum leaves its last flag on the right
edge, a pass backward carrying the suffix minimum raises its leftmost flag
on the left edge, and one pass each way answers the follow-up in `O(n)`
time and `O(1)` space.

## Sort and Compare

The sorted arrangement is the one placement every element would accept, so
the reorder window is exactly the stretch where the original refuses to
match it. The code sorts a copy of `nums`, then compares the two arrays
position by position: walking in from the left, the first disagreement is
the window's left edge; walking in from the right, the last disagreement
is its right edge. Each edge is forced — it holds a value that has to
move, so no working window can drop it — and the pair is sufficient,
because the two arrays agree everywhere outside the stretch, which makes
its values exactly the ones the sorted order keeps there; sorting the
stretch in place completes the array.

Equal values make the comparison honest rather than lucky: a duplicate
that fits agrees with its sorted counterpart and opens nothing. Every
position of `[1, 2, 2, 3]` matches, so the answer is 0; in
`[1, 3, 2, 2, 2]` the disagreements land on the `3` and on the final `2`
— the plateau's middle positions match their sorted selves — and the scan
still closes the length-4 window. An already sorted or entirely equal
array agrees everywhere and answers 0.

**Complexity:** `O(n log n)` time, `O(n)` space.

## Running extremes from both ends

An element is misplaced exactly when an order seen from one end breaks at
it: something larger stands before it, or something smaller after it. So one
scan left to right carrying the running maximum — the prefix max — flags
every index whose value dips below it, and the last flag it leaves is the
window's right edge; one scan right to left carrying the running minimum —
the suffix min — flags every index whose value rises above it, and the
leftmost of those, the last flag the backward scan leaves, is the left
edge. Every index neither scan flags already sits larger than all before it
and smaller than all after it, so the stretch between the two edges is the
shortest subarray whose sort leaves the whole array sorted, and length 0
falls out when no flag ever appears.

The comparisons are strict, so equal values never extend the window on
their own: an element that merely equals the running extreme still fits the
sorted order and raises no flag. `[1, 2, 2, 3]` therefore needs no work,
while `[1, 3, 2, 2, 2]` needs its length-4 window — the plateau is flagged
by the 3 above it, not by its own repeats — and an entirely equal array
records nothing and returns 0.

Sorting a copy and comparing it against the original finds the same first
and last mismatched positions in `O(n log n)`. The two running-extreme
scans answer the follow-up instead: each element is touched once, and
nothing is kept beyond the two boundary indices and the two running
extremes.

**Complexity:** `O(n)` time, `O(1)` space.
