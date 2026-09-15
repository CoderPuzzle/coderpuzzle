# Solutions — Sort Array by Increasing Frequency

## Frequency map, composite-key sort

The target order depends only on two facts about each element: how many
times its value occurs in `nums`, and the value itself. A hash map built
with one pass counts every value's frequency in `O(n)`, after which a
single sort with a composite key — frequency ascending, value descending —
reproduces the exact order the statement asks for.

The code counts occurrences into a `freq` map, then sorts `nums` by the key
`(freq[value], -value)`. Ascending order on `freq[value]` puts rarer values
first; for elements whose frequency ties, the negated value makes ascending
order on the second key equivalent to descending order on the value itself,
so larger values win the tie. Because a stable sort never reorders elements
that compare equal, and every element sharing both a frequency and a value
is indistinguishable from the others of that value, the whole run of a
tied-frequency value stays grouped together in the output.

**Complexity:** `O(n log n)` time, `O(n)` space.
