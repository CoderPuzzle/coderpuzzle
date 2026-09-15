# Solutions — Minimum Cost Good Caption

Turning a character into `ch` costs exactly its alphabet distance
`|caption[i] - ch|` per step, so the search is over target captions: a good
caption is a sequence of runs, each of one character and length at least 3.
The whole problem is which runs to cut where, and which character each run
becomes.

## Suffix DP over run states with a greedy reconstruction

Work backwards with a single table: `A[i][c]` is the cheapest completion of
positions `i..n-1` given a closed run (length at least 3) of character `c`
just behind position `i`. From that state the caption either extends the run
by `c` (`|s_i - c| + A[i+1][c]`) or plants a fresh run of some `ch != c`; a
fresh run consumes `i`, `i+1`, `i+2` and re-enters the closed state at `i+3`,
so switching costs the best `triple(i, ch) + A[i+3][ch]`. That best over
`ch != c` is tracked as a top-2 pair, which makes excluding `c` itself an
`O(1)` lookup, and lengths 1 and 2 of a young run need no table at all —
they are forced continuations expressible through `A`. The recursion is
`O(26 n)` time and space, everything bounded by `25n < 2^31`.

The lexicographically smallest optimum comes from a forward walk over the
finished table: at each position take the smallest character whose branch
still hits the remaining budget exactly. A closed run's choice collapses to
`O(1)` per position — extend, or the top-2 switch letters — so the walk is
linear. Lengths `n < 3` can never form a run and return `""` immediately.

**Complexity:** `O(26 n)` time, `O(26 n)` space.
