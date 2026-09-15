# Solutions — Find Champion I

Every pair of teams decides exactly one winner, and the constraint's
transitivity guarantee turns those pairwise decisions into a strict total
order over the teams. The champion is the maximum of that order: the one
team nobody is stronger than. Finding a maximum never needs the whole
matrix — it needs one decided comparison per remaining candidate.

## Elimination scan, one cell read per team

Keep a current `champion`, starting at team 0, and let every later team
challenge it. The single cell `grid[team][champion]` already decides the
challenge: if it is 1, the challenger is stronger and takes over;
otherwise the incumbent stays. This is correct because `champion` is
always the strongest of all teams processed so far — inductively, the
strongest of a prefix either keeps that title against a weaker newcomer
or loses it to a stronger one. After all n - 1 challenges the survivor is
stronger than every other team, so no team is stronger than it, which is
exactly the statement's definition of the champion.

Each of the n - 1 challenges costs one cell read, so the scan touches the
matrix `O(n)` times with `O(1)` extra space — no row sums, no counting,
and no dependence on n beyond the single pass. All answers are team
numbers below n <= 100, so machine integers carry everything.

**Complexity:** `O(n)` time, `O(1)` space.
