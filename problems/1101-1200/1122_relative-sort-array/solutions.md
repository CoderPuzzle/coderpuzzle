# Solutions — Relative Sort Array

## Rank map plus a composite sort key

Every element of `arr1` needs one of two orders: if it appears in `arr2`,
its position is dictated by that array; otherwise it goes to the tail,
sorted ascending. A hash map from value to `arr2` index turns the first
rule into a lookup, and the two rules compose into a single comparison key
`(rank, value)` — elements present in `arr2` compare by their rank there,
and absent ones all share the sentinel rank `arr2.length`, so among
themselves they fall back to comparing values, which is exactly "ascending
at the end".

Because the key is a plain pair, the language's own stable sort produces
the answer in one pass; duplicates of an `arr2` value keep the same rank
and end up adjacent in input-count quantity. Values are bounded by 1000, so
the sentinel rank never collides with a real one.

**Complexity:** `O(m + n log n)` time for `m = |arr2|` map entries and the
sort of `n = |arr1|` elements, `O(n)` extra space for the key array and map.
