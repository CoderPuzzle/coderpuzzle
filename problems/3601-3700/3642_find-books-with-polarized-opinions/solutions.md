# Solutions — Find Books with Polarized Opinions

## One Group per Book, Judged in HAVING

Every rule in this problem is a property of a book's session set, so the
query is a single grouped pass: join `ReadingSessions` to `Books` on
`book_id` and group by the book's columns. Inside each group,
`COUNT(*)` is the session total, `MIN`/`MAX` of `session_rating` give
the spread and — for free — the both-sides test, since a book with at
least one rating of 2 or lower and one of 4 or higher is exactly a group
whose minimum is at most 2 and whose maximum is at least 4. The extreme
count comes from flagging each row: a `CASE` expression pays out 1.0 for
ratings outside the open middle (2 or lower, or 4 or higher) and 0.0
otherwise, and averaging those flags _is_ extreme-ratings-over-total.

All four admission rules are per-group facts, so they live in `HAVING`,
not `WHERE`: at least five rows in the group, minimum at most 2, maximum
at least 4, and the flagged average at least 0.6. The threshold is
applied to the exact average; the same average appears once more in the
SELECT wrapped in `ROUND(..., 2)` purely for display, so filtering and
reporting never interfere. Books that fail any rule simply lose their
group, which is what an empty result looks like here — no outer joins or
extra branches needed.

`ORDER BY polarization_score DESC, title DESC` ranks the reported
scores, letting equal scores fall through to reverse-alphabetical title
order. Each session row is joined, flagged and aggregated a constant
number of times, so with hash join and hash grouping the query runs in
one linear sweep over the tables (sort-based plans add a log factor);
working storage is the per-book groups.

**Complexity:** `O(S + B)` time and space for `S` sessions and `B`
books.
