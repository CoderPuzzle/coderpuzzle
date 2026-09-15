# Solutions — Order Two Columns Independently

The two columns must be reordered without keeping their original row pairing,
so the answer is really two independent rankings laid side by side: the
`first_col` values ascending and the `second_col` values descending, joined
positionally.

## Rank each column, then join on the rank

Number the rows of `Data` twice — once by `first_col` ascending, once by
`second_col` descending — and join the two numbered lists on that rank. Row
`k` of the result then pairs the k-th smallest `first_col` with the k-th
largest `second_col`, which is exactly the requested layout; the final
`ORDER BY` on the rank presents the rows with `first_col` ascending.

Duplicate values make the individual rank assignments arbitrary among ties,
but that arbitrariness cancels out: equal values are interchangeable within
their column's ordering, so the value sequence each ranking produces — and
therefore the joined output — is fully determined by the multiset of stored
values, duplicates included. Duplicate rows are consequently no special case
at all.

Each ranking scans the table once with a window sort, and the join matches
the two rank lists one-to-one, so with `S` rows the query does two sorts and
a linear merge.

**Complexity:** `O(S log S)` time, `O(S)` space.
