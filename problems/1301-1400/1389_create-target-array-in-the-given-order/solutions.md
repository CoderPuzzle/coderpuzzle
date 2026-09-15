# Solutions — Create Target Array in the Given Order

## Straight splice simulation

The rules describe exactly one process — start empty and insert `nums[i]` at slot `index[i]`, left to right — so the honest solution is to perform it verbatim with a list that supports positional insert. Every splice shifts the elements to the right of `index[i]` over by one, which is precisely what "insert at index" means for the target array.

The guarantee `0 <= index[i] <= i` makes each operation well-defined: after `i` insertions the array holds exactly `i` elements, so slot `index[i]` always exists. With at most 100 elements the shifting cost is negligible.

**Complexity:** `O(n²)` time for the shifts in the worst case, `O(n)` space for the returned array.
