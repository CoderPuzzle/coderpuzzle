# Solutions — Consecutive Available Seats II

## Islands by seat-id minus row number, keep every maximal island

Consecutive free seats form islands, and the classic gaps-and-islands key
finds them in one scan: within the free rows ordered by `seat_id`, subtract
each row's `ROW_NUMBER()` from its seat id. Ids 3, 4, 5 number off as
3-1=2, 4-2=2, 5-3=2 — a constant inside an island that always steps up by
one whenever an occupied seat (or the table edge) interrupts the sequence.
Grouping by that constant collapses each run to its inclusive endpoints via
`MIN`/`MAX` and its length via `COUNT`.

Selecting the winners is then a self-referential filter: keep exactly those
groups whose length equals `MAX(consecutive_seats_len)` over all groups,
which — per the statement's tie rule — emits _every_ run sharing the
longest length rather than one. Rows already aggregate sorted by their group
key; an explicit `ORDER BY first_seat_id` makes the required ascending
endpoint order total regardless of island numbering quirks.

**Complexity:** `O(S log S)` time, `O(S)` space — `S` seats scanned once for
numbering, grouped, and filtered over the far smaller set of runs.
