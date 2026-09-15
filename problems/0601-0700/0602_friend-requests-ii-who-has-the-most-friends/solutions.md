# Solutions — Friend Requests II: Who Has the Most Friends

## Stack both roles, then keep the largest group

Friendship is bidirectional, so every accepted request gives its sender
and its accepter one friend each: a person's friend count is the number
of rows in which they appear in either id column.
`WITH friends AS (SELECT requester_id AS id FROM RequestAccepted UNION
ALL SELECT accepter_id FROM RequestAccepted)` stacks both columns into
one, turning each row of the table into two rows of the union — one per
side of the friendship. `UNION ALL`, not `UNION`, is deliberate:
appearing in many rows is many friends, so duplicate ids must survive
the merge. `GROUP BY id` with `COUNT(*)` then collapses the stacked
column into every person's friend total.

`ORDER BY num DESC LIMIT 1` keeps the largest total, and the test-case
guarantee carries the tie-breaking, not the query: only one person has
the most friends, so the top count is unique and `LIMIT 1` returns that
person alone — no tie-break key is needed, and the follow-up's world of
several tied leaders is the same query with `LIMIT 1` dropped. Counting
is order-independent, so row order and accept dates never matter, and
because every union row comes from one table column read twice, no join
can inflate a count.

One pass over the `N` accepted requests builds the `2N` stacked rows;
grouping collapses them into `P` groups (`P` distinct people); ranking
the `P` groups costs a sort, and a single row leaves.

**Complexity:** `O(N + P log P)` time, `O(P)` space.
