# Solutions — Escape the Spreading Fire

## Fire BFS plus binary search on waiting time

Everything about the fire is captured by one multi-source BFS: seeding a queue with every initial fire cell and spreading to non-wall neighbours computes `fire[i][j]`, the earliest minute at which fire occupies each cell (`INF` if it never does — the walls-contain-everything case). This is precomputed once, because fire spread is completely independent of where you walk.

Whether a given wait `t` is survivable is checked by a second BFS over positions carrying the current time. The timing rules encode the turn order — you move, _then_ fire spreads — which yields two distinct conditions: you may enter an ordinary cell at time `t + 1` only if the fire arrives strictly later (`t + 1 < fire`), because fire spreading onto you after your move kills you; but the safehouse may be entered at `t + 1 <= fire`, since reaching it the instant the fire does still counts as escaping. The start cell additionally requires `wait < fire[0][0]` outright. Survivability is monotone in `wait` (waiting longer only shrinks your head start), which is what licenses the search.

Rather than guessing at boundary arithmetic, the code settles the two sentinels first: if `can_reach(0)` fails the answer is `-1`; if `can_reach(10^9)` succeeds the fire can never pin you down and the answer is the sentinel `10^9` itself. Only then does an upper-mid binary search over `[0, 10^9]` find the largest survivable wait, with `mid = (lo + hi + 1) // 2` to keep the upward-moving bound converging. Each `can_reach` is one BFS, so the whole solve is about thirty grid traversals on top of the fire BFS.

**Complexity:** `O(mn log(10^9))` time, `O(mn)` space.
