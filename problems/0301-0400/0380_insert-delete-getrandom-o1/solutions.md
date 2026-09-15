# Solutions — Insert Delete GetRandom O(1)

## Array plus Index Map

Neither of the two obvious containers suffices alone: an array answers `getRandom`'s `a[0]` instantly but needs an `O(n)` scan to decide presence, while a hash set answers presence in `O(1)` but cannot expose a fixed slot. The `RandomizedSet` keeps both — the elements in an array `values`, and a hash map `index` from each value to its slot in that array — so each structure covers the other's weakness.

`insert` is an append plus one map entry. `remove` cannot afford to shift the array, so it overwrites the vacated slot with the array's **last** element and drops the final slot; the moved element's map entry is rewritten to the new (smaller) index. When the removed value already sits at the end, the slot and the swap partner coincide and the array simply shrinks — the `slot != last` guard skips the self-move. Because this is a set, each value has exactly one index, so one repair per removal is always enough.

`getRandom` draws uniformly from the live `values` array — a random slot in `O(1)`. The judge verifies uniformity statistically (each judged `getRandom` is invoked ~2000 times and every live element's empirical frequency must match its uniform probability within a tolerance band), so any correct uniform sampler passes.

Both the Python and Java canonical solutions implement exactly this pair of structures. With at most `2 * 10⁵` operations, each costing a constant number of map and array touches, the whole workload stays far inside the limits.

**Complexity:** average `O(1)` time per `insert`/`remove`/`getRandom`, `O(n)` space.
