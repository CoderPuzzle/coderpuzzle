# Solutions — Fix Product Name Format

## Normalize both columns, then group by the normalized pair

The two malformed columns are independent, so each gets its own
normalization expression: `LOWER(TRIM(product_name))` strips leading and
trailing white space before lower-casing, collapsing every casing and
spacing variant of a name (`'LCPhone'`, `' lcphone'`, `'LCPHONE '`) down to
one canonical string, while `strftime('%Y-%m', sale_date)` reads the
`'YYYY-MM-DD'` date and keeps only the year and month, collapsing every day
within a month to one group. Neither expression touches internal
white space, so `'Board Game'` and `'Board  Game'` still normalize to two
distinct product names — the rule only promises leading and trailing spaces
are cleaned up.

Grouping by the pair of normalized expressions, rather than by the raw
columns, is what makes `COUNT(*)` count the right rows: every row whose
product name normalizes to the same string and whose sale date falls in the
same month lands in one group, and its count is that group's `total`. The
final `ORDER BY` sorts on the same two normalized expressions used for
grouping — first by `product_name` ascending, then by `sale_date`
ascending to break ties — so the output order matches what the aliases
report rather than depending on the order rows happened to be grouped in.

**Complexity:** `O(n log n)` time for `n` rows in `Sales` (grouping and the
final sort), `O(n)` auxiliary space for the intermediate groups.
