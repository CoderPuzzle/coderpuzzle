# Solutions — Count Zero Request Servers

## Offline Sliding Window

A log matters to a query only through its time: query `q` counts every server
that logged at least one request inside the inclusive interval
`[q - x, q]`. Once the logs are sorted by time, each query's hits form a
contiguous run of that sorted list — every entry with time at least `q - x`
and at most `q` — so answering the queries in increasing order of their value
lets a single sliding window serve them all. Because several entries can name
the same server inside one window, the window carries a per-server occurrence
count plus a running total of distinct servers rather than just its length.

The query _indices_ (not the queries themselves) are sorted by query value so
answers still land at their original positions. Two pointers bound the window:
the right pointer advances over logs whose time is at most the current query
value, then the left pointer drops logs whose time is below `q - x`. Both
bounds only move forward — `x` is fixed and queries arrive in increasing
order — so each pointer sweeps the sorted logs at most once. The answer for
the query is `n` minus the distinct-server count.

The comparisons encode the interval's inclusivity directly: a log at exactly
`q` enters (`<=` on admission) and a log at exactly `q - x` stays (`<` on
eviction), while the constraint `x < queries[i]` keeps the lower edge strictly
below the upper one. A query whose window covers no logs finds an empty
window and reports `n`; when every server appears, the count reaches `n` and
the answer is `0`.

**Complexity:** `O(m log m + q log q)` time, `O(n + m + q)` space, where
`m = logs.length` and `q = queries.length`.
