# Solutions — Find Cities in Each State

## One grouped string per state with an order-carrying concatenation

The whole problem is a single grouping: rows share a `state`, and the
group's cities must come back as one `'city, city, city'` string. SQLite's
`GROUP_CONCAT(city, ', ')` does exactly this once the second argument
pins the separator to a comma plus a space — the default is a bare comma,
which would not match the example. The `ORDER BY city` inside the
aggregate is what fixes the join order: cities are appended lowest-first,
realizing "ordered by ... city in ascending order" independently of the
order rows happen to sit in the table.

Grouping by `state` collapses each state into one row, and since only one
output row per state can exist, ordering those rows by `state` ascending
satisfies both required levels of order at once. Names compare under
SQLite's default binary collation — plain character-code order — which is
precisely the ordinary ascending comparison the statement asks for on
diacritic-free names like these; that is why shorter prefixes (`Spring`
before `Springfield`) and hyphenated names sort exactly as expected.

**Complexity:** `O(R log R)` time for sorting `R` table rows (the
aggregation then walks them once) and `O(R)` space for the output strings.
