# Solutions — Concatenate the Name and the Profession

## String concatenation with a descending id sort

Each output row is fully determined by one input row: the composed name
is `name`, immediately followed by an open parenthesis, the profession's
first letter, and a close parenthesis. The `||` operator builds that
string directly from `substr(profession, 1, 1)`, so no lookup table is
needed — every enumeration value happens to start with exactly the
letter the statement wants, uppercase in the data itself.

The report then needs the plain whole-table projection ordered by
`person_id` descending. Because `person_id` is the primary key, its
values are unique, so `ORDER BY person_id DESC` yields a total order:
there are no ties that would leave row order ambiguous across engines.
One pass to scan, one sort over it.

**Complexity:** `O(n log n)` time for the sort, `O(n)` space for the
result rows.
