# Solutions — Two Sum III - Data structure design

## Hash multiset with a lazy find

The structure is one hash map from value to occurrence count. `add` bumps a counter — constant time, independent of everything stored before it — and `find` walks the distinct stored values once, asking the map whether `value - number` is also present. Nothing about a `find` changes the structure, so consecutive finds over an untouched multiset are pure re-reads.

The one subtlety is a value that is its own complement: `find(2 * x)` must succeed only when `x` was added at least twice, so the scan checks the stored count before accepting a number that pairs with itself. One stored 3 answers `find(6)` false; a second 3 turns it true, and no other stored value can fake it.

The work is put on `find` deliberately. The statement caps `add` and `find` at `10⁴` calls in total, so neither side can dominate by volume, which makes the constant-time side the one to put under the streaming operation: a sorted-list variant pays an insertion cost on every `add` to enable a two-pointer scan, and eagerly storing every reachable pair sum pays for targets that may never be queried. Here each unqueried target costs nothing, and every `find` is a single pass over distinct values with constant-time lookups.

**Complexity:** `add` in `O(1)`, `find` in `O(d)` over `d` distinct stored values; `O(d)` space.
