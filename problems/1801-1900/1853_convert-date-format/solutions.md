# Solutions — Convert Date Format

SQLite's date functions expose the weekday number (`%w`, Sunday = 0) and
the month number (`%m`) but no locale names, so both names come from
explicit `CASE` maps. The day-of-month must lose its leading zero — the
expected format prints `9`, not `09` — which an integer cast round-trip
does for free, while `%Y` already carries the four-digit year verbatim.

## STRFTIME numbers with CASE name maps

Select from `Days` and build one concatenated string per row: a `CASE`
over `STRFTIME('%w', day)` for the weekday name, a `CASE` over
`STRFTIME('%m', day)` for the month name, then the unpadded day via
`CAST(STRFTIME('%d', day) AS INTEGER)`, and finally `%Y`. Each piece is
pure string arithmetic on values SQLite itself derives from the stored
date, so leap years, century boundaries, and weekday cycles are handled
by the date engine rather than by hand-rolled calendar math.

One pass over the table; each row does constant work.

**Complexity:** `O(n)` time for `n` rows, `O(1)` extra space.
