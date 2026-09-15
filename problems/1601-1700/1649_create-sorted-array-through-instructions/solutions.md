# Solutions — Create Sorted Array through Instructions

## Binary Indexed Tree

The cost of inserting a value `x` is the smaller of two counts over the already-inserted elements: how many are strictly less than `x` and how many are strictly greater. As the array is processed left to right, both counts change with every insertion, so we need a structure supporting prefix counting with point updates — a binary indexed tree (Fenwick tree) indexed by value.

The tree is sized to the maximum instruction value `m`. For each instruction `x`, `query(x - 1)` returns the number of inserted elements strictly below `x`, and `count - query(x)` gives those strictly above (`query(x)` includes equal values, and `count` is how many elements have been inserted so far). The cost added is the minimum of the two, reduced modulo `10⁹ + 7` at each step; afterwards `update(x)` records the new element and `count` increments.

Each Fenwick operation walks the lowbit ladder and costs `O(log m)`, so the whole pass is linear in the number of instructions times that logarithm. Values are at least 1, so `query(x - 1)` never touches the phantom index 0. Equal values are handled naturally — they are counted in neither bucket, correctly making their insertion free relative to each other.

**Complexity:** `O(n log m)` time, `O(m)` space, where `m` is the largest instruction value.
