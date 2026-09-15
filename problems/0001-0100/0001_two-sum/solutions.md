# Solutions — Two Sum

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

## Hash map, one pass

For each number `value` we are really looking for its partner, `target - value`. A hash map from value to index answers "have I already seen the complement, and where" in constant time, which turns the nested brute-force scan into a single pass.

The code walks `nums` once with `enumerate`. At each position it first computes the complement and checks whether it is already in the `seen` map; only afterwards does it record the current value at its index. Doing the lookup before the insert is what guarantees the two returned indices are different, so the same element is never used twice — the current element cannot match itself, because it is not in the map yet.

As soon as a complement is found the method returns `[seen[complement], index]`, the earlier index first. If the loop finishes without a match it returns an empty list, though the statement promises every input has exactly one solution. Duplicate values are handled naturally: for `nums = [3, 3]` and `target = 6`, the first 3 is stored in `seen`, and the second 3 finds it as its complement.

**Complexity:** `O(n)` time, `O(n)` space.
