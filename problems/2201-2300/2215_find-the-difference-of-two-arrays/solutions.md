# Solutions — Find the Difference of Two Arrays

Both answer lists are plain set differences — "distinct values of one array
missing from the other" — so the only work is making membership tests cheap and
picking a deterministic order for the survivors.

## Hash sets, then sort the survivors

Load each array into a hash set once, so every "is this value present in the
other array" question costs constant time instead of a linear rescan. Walking
`nums1` against `set2` and `nums2` against `set1` with a membership filter
leaves exactly the distinct survivors on each side; because the judge compares
the nested arrays exactly, each survivor list is then emitted in ascending
order, pinning the one arrangement of the many orderings the statement permits.

The sets hold at most all distinct values of their inputs, and the final sorts
touch only the surviving values. All values sit inside `[-1000, 1000]`, so
every list stays far below any size or precision limit — plain integers
everywhere, no 64-bit or rounding concerns in any language.

**Complexity:** `O(n + m + k log k)` time, `O(n + m)` space, where `k` is the
number of values that survive into the answer lists.
