# Solutions — Sort Colors

Neither solution ever compares two elements with each other — with three
possible values, the multiset is all that matters, and each solution reads one
element at a time and decides where it belongs. The counting sort spends its
first sweep on bookkeeping, then rewrites the array from the tallies. The
three-way partition never leaves the array at all: it grows settled regions
from both ends while an unexamined band in the middle shrinks, which is what
the follow-up's single-sweep challenge asks for.

## Two-Pass Counting Sort

With only three possible keys, the multiset of values determines the sorted
result completely, so no comparisons are needed. The first pass sweeps the
array once and tallies occurrences into a fixed `counts` list indexed by the
color value itself — `counts[v]` ends up holding exactly how many times `v`
appears. The second pass reconstructs the array: walking the colors in order
`0, 1, 2`, it overwrites `counts[color]` consecutive slots with that color,
advancing a single write index `index` monotonically from left to right.

Overwriting is safe precisely because the tally pass already captured every
element — nothing readable is destroyed before it has been counted. The
write index and the three per-color loops together emit exactly `n` values,
partitioning the array into a block of `counts[0]` reds, then `counts[1]`
whites, then `counts[2]` blues, which is the required order. Elements
compare equal within each block, so their original arrangement is
irrelevant.

The sort happens in place on `nums` (the only auxiliary state is the
three-slot counter), and the array is returned as the CoderPuzzle signature
requires, where the LeetCode version instead modifies in place with no
return value. The statement's follow-up teases a one-pass Dutch-national-
flag partition; the counting approach trades that extra pass for noticeably
simpler logic, and both are linear.

**Complexity:** `O(n)` time, `O(1)` space.

## Three Way Partition

The single-sweep answer keeps four regions alive at once — settled `0`s at
the front, settled `1`s behind them, settled `2`s at the back, and between
them a band of elements not yet examined. Three pointers hold the borders:
`low` just past the zeros, `mid` at the band's front, `high` at its back.
Every step reads `nums[mid]`, one element closer to done, and the loop ends
when the band empties (`mid` passes `high`) — so each element is read
exactly once.

What the read element is decides which border moves. A `0` swaps to the end
of the zero region and both `low` and `mid` step up — the element arriving
from the zero side is always a settled `1` (or `mid == low`, the swap being
a self-swap), already known and safely passed. A `1` is already in its home
region, so `mid` alone advances. A `2` swaps to the front of the tail
region and `high` retreats, but `mid` deliberately stays: whatever the
tail sent back is unexamined, and the next iteration must read it before
deciding anything. That asymmetry — advance after a low swap, hold after a
high swap — is the whole correctness of the sweep.

On `[1,0,2,1,0,0,2]`: the leading `1` just advances `mid`; the `0` swaps
left; the `2` trades with the trailing `2` and shrinks the band; the second
`1` advances; and the three remaining zeros migrate left one swap each,
leaving `[0,0,0,1,1,2,2]`. Every swap targets a border position, elements
never travel more than once in each direction, and nothing beyond the three
indices is stored.

**Complexity:** `O(n)` time, `O(1)` space.
