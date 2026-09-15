# Solutions — Find Interview Candidates

Two independent roads lead into the result: a streak of medaled
contests, or a scatter of golds. Both must be checked for every user,
and the answer is their union.

## Islands of medals, plus a gold tally

Unpivot the three medal columns into one `(contest_id, user_id)` medal
relation with `UNION`, so a user holding two medals in a single contest
appears once — winning a contest is what the streak counts, not the
number of trophies. Because the table guarantees consecutive contest
IDs, "three or more consecutive contests" is a gaps-and-islands pass:
`contest_id - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY
contest_id)` stamps every maximal run of consecutive IDs with a constant
`grp`, and `HAVING COUNT(*) >= 3` on `(user_id, grp)` keeps the streak
winners. The second condition is a plain `GROUP BY gold_medal` with
`COUNT(DISTINCT contest_id) >= 3` — distinct, because the gold column
meets each contest exactly once anyway, and the count spans
non-consecutive contests (Sarah's `190, 193, 196` in the example). The
two candidate sets feed `IN` predicates on `Users`, and name/mail come
out in any order.

The boundary cases are where the two conditions part ways: Bob in the
example is a streak candidate with one gold, while Hercy has two golds
and no streak of three, so neither condition alone suffices. Everything
runs as one wrap-safe `SELECT` with subqueries (no `WITH` header), and
rows compare as a multiset.

**Complexity:** `O(C log C)` time for the per-user sort behind the
window function, `O(C)` extra space, for `C` contest rows.
