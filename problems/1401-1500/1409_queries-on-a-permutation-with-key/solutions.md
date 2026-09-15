# Solutions — Queries on a Permutation With Key

## Simulate the move-to-front list

The rules describe exactly one data structure: a permutation that loses
an element from the middle and regains it at the front. Keeping `P` as a
list and performing that operation directly is the most faithful reading,
and the constraints make it fast enough — `m` is at most `10³` and there
are at most `m` queries, so each linear `index` scan costs `O(m)` and the
whole run is `O(m²)`, at most about a million steps.

For each query `q`, a linear scan finds the first index whose value is
`q`; that index is the reported position. Removing the element there and
inserting it at the front are both linear list operations, keeping the
permutation correct for the next query. The naive `index` search is
simpler and equally correct; the only refinement worth noting is that
every element is guaranteed to be present (`1 <= queries[i] <= m`), so no
missing-element handling is needed.

**Complexity:** `O(m²)` time in the worst case (`m` queries, each a
linear scan and a linear shift), `O(m)` space for the permutation.
