# Solutions — Last Day Where You Can Still Cross

Both routes trade on the same monotonicity: a blocked cell never reopens,
so the crossable days form an initial stretch whose right end is the
answer. Binary search pins that end down by probing days from above,
rebuilding the grid and paying a full breadth-first sweep for every probe.
The reverse-day walk flips the arrow of time instead: land reappears one
cell at a time, a disjoint-set union absorbs each return in near-constant
amortized work, and virtual sentinels for the two shores reduce the whole
question to a single root comparison.

## Binary Search on the Day with BFS Feasibility

The crossing property is monotone in time: land cells only flood, never dry, so once a top-to-bottom walk becomes impossible it stays impossible forever. This monotonicity means the set of days on which crossing is possible is a prefix of days, and binary search can find its right endpoint. The search looks for the largest `day` such that a walk still exists after the first `day` cells of `cells` have been flooded, using the upper-mid form (`mid = (lo + hi + 1) // 2`) so the loop converges on the last feasible day.

Feasibility is checked with a BFS over the land grid. The grid is rebuilt for the query day by marking the first `day` cells as water; every unflooded cell in the top row is seeded into a queue (a multi-source BFS from all possible starting points), and the search expands over unflooded, unvisited neighbors in the four cardinal directions. Success is reported the moment any cell in the bottom row is dequeued; if the queue drains without that, the day is infeasible.

The search range starts at day 1 (guaranteed crossable, since only one cell is flooded in a grid with at least 4 cells arranged in at least two rows and columns) and ends at `row * col`. Rebuilding the grid and running BFS each check costs `O(RC)` — writing `R` and `C` for the row and column counts — and there are `O(log(RC))` checks. An equivalent alternative noted in the hints is to process days in reverse and union land cells back with a disjoint-set structure, but the binary search with BFS achieves the same bound with simpler code.

**Complexity:** `O(RC log(RC))` time, `O(RC)` space.

## Reverse-Day Union-Find with Virtual Sentinels

Running time backwards dissolves the search. Reading `cells` from the last
entry to the first, land reappears one cell per step, so the open region
only grows and every merge stays done — connectivity accumulates instead
of being re-derived for each probe. A disjoint-set union is built for that
regime: each returning cell is absorbed with a handful of merges, and path
halving on `find` paired with union by size keeps every operation
amortized near-constant — the inverse-Ackermann bound.

The two shores become two extra nodes, appended after the `R * C` cell
ids. When a cell reappears it joins the top sentinel if it lies in the
first row, the bottom sentinel if it lies in the last, and every
four-directional neighbor that has already reappeared. One index
alignment then replaces the whole probe loop: after absorbing `cells[i]`
the flooded set is exactly the first `i` entries — the grid state of day
`i` — so the first time `find(top)` and `find(bottom)` agree the loop
returns `i` outright, knowing the connection cannot be older, since the
state one day later was checked one iteration earlier and found split.

In Example 1 the walk back from day 6 returns (2,1), claimed by the
bottom sentinel, then (1,3), claimed by the top; the third return, (2,3),
welds those components together, so the answer is 3. A drained loop falls
back on 0, which the constraints put out of reach: with at least two rows
and two columns even day 1 leaves a crossing. One sweep replaces the log
many probes, and each of its `RC` absorption steps costs only a constant
number of finds and unions.

**Complexity:** `O(RC α(RC))` time, `O(RC)` space.
