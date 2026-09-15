# Solutions — Most Profitable Path in a Tree

## BFS Ordering with Bob's Arrival Times

Bob has no choices: from `bob` he walks the unique path to node 0, one edge per second, so his arrival time at each node on that path is fixed and computable up front. Alice's income at a node `u` depends only on comparing her arrival time — which is exactly her depth, since she starts at the root and moves one edge per second — against Bob's: if Bob arrives later (or never passes through), Alice collects the full `amount[u]`; if they arrive simultaneously the amount is split, contributing `amount[u] / 2`; if Bob arrived earlier the gate is already open and Alice gets 0.

The tree is oriented with one BFS from the root, producing `parent`, `depth`, and a visit order in which every node appears after its parent. Bob's timeline comes from walking `parent` pointers from `bob` back to the root, storing `bob_time[node] = t` along the way. Then a single sweep over the BFS order accumulates `income[u] = income[parent] + gain`, where `gain` implements the three-way comparison above — the parent is always finalized first, so each root-to-node path sum materializes incrementally with no recursion.

![The example tree with amounts on nodes and Bob's dashed walk 3 → 1 → 0: Alice pays the full −2 at the root, shares the +4 at node 1, gets 0 at Bob's start node 3, and collects the full +6 at leaf 4 for a total of 6, beating leaf 2's 2.](figures/solution-two-walkers.svg)

Alice's candidate endpoints are the leaves: nodes other than the root with exactly one neighbor. Because she must keep moving until she reaches a leaf, the best achievable income is the maximum `income` over leaves; node 0 itself is excluded as a stopping point (its only role is as the start, whose amount is already included in the accumulation). Tracking the running maximum during the same sweep answers the query with no extra pass.

Everything is linear: one BFS for orientation, one parent-chain walk of at most `n` steps for Bob, one accumulation sweep. The `amount[i] // 2` split is exact because all amounts are even, and negative "rewards" halve correctly with floor division on even values.

**Complexity:** `O(n)` time, `O(n)` space.
