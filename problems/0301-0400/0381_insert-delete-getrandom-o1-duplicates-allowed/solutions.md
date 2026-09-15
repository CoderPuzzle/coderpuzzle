# Solutions — Insert Delete GetRandom O(1) - Duplicates allowed

## Backing array plus hash map to ordered index sets

An array alone cannot tell whether a value is present without a scan; a hash map alone cannot expose a positional element. The design combines them: a `values` array holds every occurrence, and a hash map associates each value with an ordered collection (a `TreeSet` in Java, a bisect-maintained sorted list in Python) of the indices at which that value sits in `values`. Each structure covers the other's weakness — the map answers presence and locates occurrences, the array answers `values[0]` for `getRandom` and provides O(1) positional storage.

`insert` appends to the array; the new index is always the largest, so it joins the value's ordered index set, and the return value is `true` exactly when no set existed yet. `remove` must delete the _leftmost_ occurrence (this deterministic variant pins the judge's behavior), which is why the index collections are ordered: `positions.first()` / `positions[0]` gives the smallest index directly. Deleting from the middle of an array would be O(n), so instead the last element is moved into the vacated slot and the array shrinks by one — constant-time array work, followed by index-set bookkeeping: the moved element's set swaps its last index for the vacated one, and the removed value's set drops that slot, with an empty set triggering deletion of the map entry.

The subtle case is when the value being removed is also the value at the last index: the "move" writes a copy onto itself, so the correct bookkeeping removes exactly the last index from the set while keeping the vacated slot's entry — a copy of the value remains there. `getRandom` simply returns `values[0]`, matching the deterministic judging rule. Hash lookups are average O(1); the ordered-set maintenance (tree operations or binary search plus list shifts bounded by the value's multiplicity) adds a logarithmic factor per operation, with space proportional to the collection size.

**Complexity:** `O(log n)` time average per operation (`getRandom` is `O(1)`), `O(n)` space.
