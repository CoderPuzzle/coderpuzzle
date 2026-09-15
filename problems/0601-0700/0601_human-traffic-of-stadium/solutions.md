# Solutions — Human Traffic of Stadium

## Neighbors in id, three window placements

A record qualifies exactly when it sits inside some three records with
consecutive ids whose people counts are all at least 100 — the window, not
the run, is the unit. Window functions reach each row's neighbors in id
order in one pass: `LAG` and `LEAD` of both `id` and `people` at distance
1 and 2, over `ORDER BY id`, stamp every row with the two rows on each
side of it.

The id half of the stamp is what refuses to bridge a gap. `LEAD(id) =
id + 1` and `LEAD(id, 2) = id + 2` hold only when the next rows in id
order carry exactly the next ids — a missing id breaks the chain even when
the records on both sides hold 100 or more — while dates are never
consulted for adjacency: the example's row 8 joins its run across a
skipped calendar day because ids 6, 7, and 8 are consecutive. The filter
then tests the row in each of its three possible placements — the first,
middle, or last member of a qualifying window — as three OR'd predicates.
No run-length logic is needed for longer runs: every member of a
five-record run sits in some qualifying window of its own, so all five
leave. The nulls `LAG` and `LEAD` produce at the ends of the id order
make the edge predicates unknown rather than true, so table edges are
safe. The closing `ORDER BY visit_date ASC` restates the demanded output
order — `visit_date` is unique and increases with id — and the judge
compares rows as an unordered multiset, so the order is faithful to the
statement rather than machine-checked. The classical alternative is the
triple self-join — each row tested for heading, middling, or tailing some
consecutive-id triple whose three people counts all clear the bar,
deduplicated with `DISTINCT` — which spells the same windows as join
arithmetic and pays a cubic nested loop where the window pays one sort.

One sort over `S` records feeds all six window functions, and the output
rows are a subset of the input rows, so nothing beyond the sort buffer is
materialized.

**Complexity:** `O(S log S)` time, `O(S)` space.
