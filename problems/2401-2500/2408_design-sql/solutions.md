# Solutions — Design SQL

## Per-table hash map with a monotone id counter

The whole contract collapses into one record per table: the declared column
count, a row store keyed by row id, and a per-table auto-increment counter.
The counter is the entire trick behind the id rule — failed inserts return
before touching it, and removals never roll it back, so the ids issued in a
table strictly ascend and are never reused. "One greater than the id of the
last inserted row, even if the last row was removed" is then just the
counter's next value, and a removed row leaves a permanent gap.

Every method reduces to a name lookup plus one local edit on the record it
finds. `ins` validates the name and the row width before allocating the
next id; `rmv` is a silent delete whether the id exists or not; `sel`
validates the name, a live row id, and `1 <= columnId <= columns` before
indexing — ids and columns are both 1-based on this interface — answering
`"<null>"` on any miss. `exp` serializes the live rows as
`id,cell1,...,cellm`; because issued ids strictly ascend, walking the row
store in key order (or sorting its keys once) yields exactly the required
output order.

Only the one addressed table is touched per call, so `ins`, `rmv`, and
`sel` cost one hash lookup plus one row-map operation — `O(1)` expected
with hash maps, `O(log k)` with the ordered maps some languages use to get
`exp`'s ordering for free. `exp` pays `O(k log k)` worst case for the sort
(`O(k)` where the map is ordered), `k` being the table's live rows. Space
is the schema plus every live row.

**Complexity:** `O(1)` expected / `O(log k)` time per `ins`/`rmv`/`sel`,
`O(k log k)` per `exp`, `O(n + k_total)` space.
