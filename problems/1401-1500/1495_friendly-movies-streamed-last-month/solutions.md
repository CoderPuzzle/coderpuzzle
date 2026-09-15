# Solutions — Friendly Movies Streamed Last Month

## Join, filter on all three predicates, DISTINCT

Every condition lives in a different table — kid-friendliness and the
movie category in `Content`, streaming dates in `TVProgram` — so the
query is one inner join on `content_id` followed by a WHERE clause
holding all three predicates together: `Kids_content = 'Y'`,
`content_type = 'Movies'`, and the program date inside June 2020.
Extracting `'2020-06'` with `STRFTIME('%Y-%m', program_date)` makes the
window comparison a single string equality that correctly includes every
June 2020 timestamp and excludes both May and July.

A title streamed several times in the month appears once per airing in
the joined rows; `SELECT DISTINCT` collapses those duplicates so each
qualifying title is reported exactly once. The result is returned in any
order.

**Complexity:** one join plus one filtered scan,
`O(n + m)` time for `n` programs and `m` content rows, `O(k)` space for
the `k` distinct qualifying titles.
