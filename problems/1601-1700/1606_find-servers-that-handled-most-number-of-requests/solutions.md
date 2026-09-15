# Solutions — Find Servers That Handled Most Number of Requests

## Fenwick tree of free servers + min-heap of finish times

The two things the router needs quickly are "which servers are free right
now" and "when does the next server become free". A Fenwick tree (binary
indexed tree) over the `k` server ids, where a `1` marks a free server and
`0` a busy one, answers the first: `query(x)` gives the count of free
servers with id `< x`, and a binary-lifting walk over the same tree finds
the position of the `m`-th free server in `O(log k)`. A min-heap of
`(finishTime, serverId)` pairs answers the second: its top is always the
busy server that will free up soonest.

Processing request `i` starts by popping every heap entry whose finish
time is `<= arrival[i]` and flipping that server back to free in the
Fenwick tree — this is what makes "busy" and "free" track wall-clock time
correctly even though servers are freed lazily. If the tree's total free
count is then zero, the request is dropped. Otherwise let `start = i % k`
and `c = query(start)`, the number of free servers with id `< start`. When
`c` is less than the total free count, some free server has id `>= start`,
and it must be the `(c + 1)`-th free server overall — the walk finds it
directly, with no need to re-check that it lands past `start`. When `c`
equals the total, every free server has id `< start`, so the search wraps
around and takes the very first free server instead (the `1`st in the
walk's ordering). Either way the chosen server is flipped to busy, its
count incremented, and `(arrival[i] + load[i], server)` is pushed onto the
heap.

Once every request has been processed, the answer is every server whose
count equals the maximum count seen.

**Complexity:** `O((n + k) log k)` time, `O(k)` space, where `n` is the
number of requests.
