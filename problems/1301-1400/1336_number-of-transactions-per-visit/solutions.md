# Solutions — Number of Transactions per Visit

## Approach: Left-join count per visit, then a recursive tally

A visit is identified by the pair (user_id, visit_date), and every
transaction belongs to exactly one visit — the one with the same user and
date, guaranteed to exist. So `Visits LEFT JOIN Transactions` on both
columns, grouped by the pair, gives each visit's transaction count, with
unmatched visits correctly counted as 0 (`COUNT(t.amount)` counts only
non-null right-side rows).

The output must contain every transactions_count from 0 up to the observed
maximum, including empty buckets. A recursive CTE (`tally`) generates the
integer sequence 0..max; joining it against the per-visit counts (an outer
count over the grouped table) fills each bucket, 0 where no visit lands.
The tally stops at the maximum observed count, exactly where the statement
says to stop.

**Complexity:** `O(V + T + M)` rows processed with `V` visits, `T`
transactions and `M` the maximum per-visit count.
