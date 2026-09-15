# Solutions — Online Election

An election's lead only changes hands when a vote arrives, and the votes
already arrive sorted by time, so nothing about a query is really online: the
leader after every ballot can be settled once, up front, and each query
reduces to locating the last ballot at or before `t` in that frozen history.

## Leader per vote, binary search per query

The constructor walks the votes in order, keeping a count per person — person
ids are dense in `[0, n)`, so a plain count array indexes them without a hash
map — and the current leader, and appends the leader after each ballot:
`leaders[i]` is the leader among the first `i + 1` votes. The tie rule falls
out of one comparison: a ballot that brings its candidate up to the current
maximum (`>=`) hands the lead to that candidate, whose ballot is by then the
most recent vote among the tied candidates, while a strictly larger count
takes the lead outright. Between ballots nothing changes, so `leaders` is the
complete state history and nothing else needs to be remembered.

`q(t)` must count ballots cast exactly at `t`, so it needs the rightmost
index with `times[idx] <= t` — the upper bound of `t` in `times`, minus one.
Strictly increasing times are exactly the sortedness a binary search
requires, and the guarantee `t >= times[0]` keeps that index nonnegative, so
every answer is one `O(log n)` probe into `leaders`.

Every value stays narrow along the way: person ids are below `5000`, counts
below `5001`, times and queries at most `10⁹`, so plain 32-bit integers carry
the entire computation with no wider arithmetic anywhere.

**Complexity:** `O(n)` build + `O(log n)` per query time, `O(n)` space.
