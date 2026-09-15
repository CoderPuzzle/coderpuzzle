# Solutions — Find Trending Hashtags

## Cut the tag, group February, keep the top three

Each tweet carries exactly one hashtag, so the tag is a property of the
row: everything from the `#` — located with `INSTR(tweet, '#')` — to the
next space, or to the end of the tweet when the tag closes it. The `feb`
CTE restricts the table to February 2024 first (`BETWEEN '2024-02-01' AND
'2024-02-29'`; 2024 is a leap year, so the month ends on the 29th) and
keeps only the tail `SUBSTR(tweet, INSTR(tweet, '#'))`. The `hashtags`
CTE then trims that tail at its first space: `INSTR(tail, ' ')` returns 0
when there is none, in which case the whole tail is the tag, otherwise
`SUBSTR(tail, 1, INSTR(tail, ' ') - 1)` cuts just before it.

Counting is a plain `GROUP BY hashtag` with `COUNT(*)` — every surviving
row is one mention. The final `ORDER BY hashtag_count DESC, hashtag DESC`
realizes the demanded ordering, and `LIMIT 3` keeps the top three. The
secondary key matters exactly at the cut: when several tags share the
third-place count, the lexicographically largest one wins the seat, which
is what "descending by hashtag respectively" asks for — in the example,
`#HappyDay` (3) and `#TechLife` (2) lead, and `#WorkLife` takes the last
row over `#Nature` on that tiebreak.

**Complexity:** `O(n + k log k)` time, `O(k)` space — one pass over the
`n` February tweets buckets mentions into `k` tags, then the `k` groups
are sorted.
