# Solutions — Minimum Time to Break Locks II

The sword's factor X depends only on how many locks have been broken so
far, so if lock i is broken k-th, it is charged at factor k: its energy
grows 0, k, 2k, ... each minute and it breaks after exactly
ceil(strength[i] / k) minutes. Waiting beyond that moment only wastes
time (energy resets on every break and X never changes between breaks),
so a break order π costs exactly sum over k of ceil(strength[π(k)] / k),
and the task is to choose the order minimizing that sum.

## Hungarian algorithm (minimum-cost matching)

Build the n×n cost matrix cost[i][j] = ceil(strength[i] / (j+1)) — the
time to break lock i if it is the (j+1)-th lock broken. The answer is the
minimum-cost perfect assignment between locks and positions, which is
exactly what the Hungarian algorithm with potentials computes in O(n³):
each round grows a shortest-alternating-tree from an unmatched row,
adjusting the dual variables u, v by the tightest slack delta so at least
one new edge becomes tight, then augments along the tree through the
way[] parent pointers. After all n rounds the matched column of each row
is read off p[], and the matched costs sum to the minimum total time.
n ≤ 80 keeps each round at O(n²) edge relaxations, so the whole run is a
few hundred thousand operations.

**Complexity:** `O(n³)` time, `O(n²)` space.
