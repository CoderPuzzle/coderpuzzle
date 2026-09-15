# Solutions — Sort the People

## Index sort by descending height

The answer is a permutation of `names` decided entirely by `heights`: the
person with the tallest height goes first, the next tallest second, and so
on. Rather than physically swapping names into place (the hint's repeated
selection), the code sorts an array of indices by the height stored at each
index, with a descending comparator. Sorting the indices keeps the pairing
`names[i] ↔ heights[i]` intact and lets the final loop build the answer by
indexing `names` in the sorted order.

Because the heights are guaranteed distinct, the comparator never sees a
tie, so the result does not depend on the sort's stability. Duplicate names
are harmless — the example with two "Bob"s works because the two rows have
different heights, and each index keeps its own name. A hash table from
height to name would also work, but sorting indices is direct and avoids an
extra structure.

**Complexity:** `O(n log n)` time, `O(n)` space.
