# Solutions — Users That Actively Request Confirmation Messages

The answer is the set of users who have two confirmation requests no more
than 24 hours apart.

## Self-join on the request timestamps

A user qualifies as soon as any two of their confirmation requests are no
more than 24 hours apart, so the query joins `Confirmations` to itself on
`user_id` with `c1.time_stamp < c2.time_stamp`. That enumerates every
ordered pair of a user's requests; the inequality keeps only the pairs
whose gap falls inside the window, and `SELECT DISTINCT user_id` collapses
the surviving rows to one per qualifying user. The strict `<` on the
timestamps visits each unordered pair once and can never match a request to
itself, since the primary key forbids duplicate `(user_id, time_stamp)`
rows.

The gap is measured in seconds with `strftime('%s', c2.time_stamp) -
strftime('%s', c1.time_stamp)`, SQLite's Unix-epoch conversion, and pairs
survive when the difference is at most `86400`. Integer second arithmetic
makes the "exactly 24 hours apart" boundary exact: two messages 24 hours
apart count as within the window, while 24 hours plus one second do not —
the crawl example's user 7, 24 hours and 1 second apart, is correctly
excluded. The `Signups` table is never consulted, because the check
involves only the confirmation request times.

The self-join and distinct scan each confirmation row a constant number of
times, but a single user with many requests still yields every pair.

**Complexity:** `O(n²)` time, `O(n)` space, where `n` is the number of
confirmation requests (every pair of a user's requests may be examined in
the worst case).
