# Solutions — Pair Sum

Both sweeps rest on the same pin: fixing one member of the pair determines
the other, so the search is really a hunt for `target - value` sitting
somewhere in the array. The sort buys ordered ground: once positions are
arranged by value, two pointers can converge from the ends, and each
comparison rules out one position for good. The hash map asks each
position's question directly instead — has my partner gone by? — and needs
only one look at the data.

## Sort Two Pointer

Ordering the positions by value turns the pair hunt into a converging scan.
The code sorts an array of positions keyed by their values — positions, not
values, because the answer is a pair of positions and the sort would otherwise
erase them. Two pointers then close in from both ends of that order: the
smallest value yet unmatched at `low`, the largest at `high`.

Their sum admits exactly three readings. Equal to `target`, the pair is found
and its two positions are returned in value order. Below `target`,
`order[low]` plus even the largest value still in play — `order[high]`, which
was just tried — falls short, so no remaining partner can rescue it and `low`
steps up. Above `target`, symmetrically, `order[high]` plus even the smallest
remaining value overshoots, so `high` steps down. Either way one position is
retired as a possible member for good, which is why the scan finishes in a
single pass over the sorted order.

Equal values among the positions need no care: the pointers only ever compare
sums, and the unique guaranteed pair surfaces in whatever block of equals it
lives. The sort is the whole bill — `O(n log n)` — and the positions array is
the only extra storage.

**Complexity:** `O(n log n)` time, `O(n)` space.

## Hash Map

Fixing one member of the pair determines the other: if the value at the current
position is `value`, its partner must be `target - value`. That reframes the
search — instead of trying every pair, we ask a single question at each
position, "has the required partner already appeared, and where?" A hash map
keyed by value answers it in expected constant time, so the quadratic scan
collapses to one sweep.

The code walks `nums` with `enumerate`. At each position it computes the
complement and looks it up in `seen` _before_ recording the current value. That
order is what enforces the no-self-pairing rule: the current position is not in
the map yet when its own complement is checked, so it cannot match itself, and
the two positions returned are necessarily different.

The moment a complement is found the method returns `[seen[complement], index]`
— the earlier position first. If the sweep ends with no match it returns an
empty list, which the statement's uniqueness guarantee makes unreachable.
Repeated values need no special handling: for `nums = [9, 2, 9, 17]` and
`target = 18`, the first nine is recorded at position 0, and the second nine
finds it there.

**Complexity:** `O(n)` time, `O(n)` space.
