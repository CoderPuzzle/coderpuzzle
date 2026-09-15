# Solutions — Maximum Number of Accepted Invitations

Each accepted invitation is a boy–girl pair, every boy and girl appears in at
most one pair, and only pairs allowed by `grid` may form — so the answer is a
maximum matching in the bipartite graph whose left side is boys, right side is
girls, and edges are the `1` cells.

## Augmenting paths, boy by boy

Process the boys one at a time, keeping `invitations[girl]`, the boy currently
matched to that girl (or `-1`). To seat a new boy, walk his allowed girls: a
free girl ends the search, and a taken girl recurses into the boy holding her,
asking him to move to another girl of his own. That recursive reroute is an
alternating path; if it ends at a free girl the path is _augmenting_ — every
boy on it gets (re)matched and the total grows by exactly one. A `seen` set
per top-level attempt keeps each girl from being probed twice, so the search
for one boy costs at most `O(m·n)`.

If an attempt fails, the boy stays uninvited; by the matching theory behind
this construction (Kuhn's algorithm), retrying earlier boys can never rescue
him — the matching left behind is already maximum for the boys processed so
far, and the final count is the maximum matching overall. With `m, n ≤ 200`
the recursion depth is bounded by the number of girls, far under any stack
limit, and the answer is at most `min(m, n)`, trivially inside 32 bits.

**Complexity:** `O(m²·n)` time, `O(n)` extra space.
