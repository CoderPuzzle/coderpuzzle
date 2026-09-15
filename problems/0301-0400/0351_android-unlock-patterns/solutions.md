# Solutions — Android Unlock Patterns

## Skip-table depth-first search

A segment between two dots passes through another dot's center only when that
dot sits exactly between its endpoints — horizontally, vertically, or
diagonally. Those are precisely the eight unordered pairs (1,3), (1,7),
(3,9), (7,9), (1,9), (3,7), (2,8), (4,6), each skipping the dot at its
middle: 2, 4, 6, 8 once each and the center 5 five times over. Recording them
in a skip table turns validity into a lookup — a depth-first search from a
chosen start dot tries each unvisited next dot whose skipped middle, if any,
already belongs to the pattern, and counts the growing prefix the moment it
reaches `m` dots while letting it grow no further than `n`. A bitmask of
visited dots carries the state, with bit 0 permanently set as a phantom "no
dot in between" so segments without a middle pass the same check.

Rotating or reflecting the grid relabels dots but never changes which
segments skip which middles, and it permutes the four corners among
themselves, the four edge midpoints among themselves, and fixes the center.
So three searches — from corner 1, edge 2, and center 5, the first two counts
each multiplied by four — cover all nine starting dots. This solution applies
that symmetry pruning, which is the classic optimization for the problem.

The domain is finite, so the cost is honest and concrete: the search tree is
exactly the tree of valid pattern prefixes, 389,497 nodes at full depth
(`m = 1, n = 9`) inside the 986,409 ordered dot sequences of length at most
9, and pruning walks only the share rooted at dots 1, 2, and 5. Every node
does nine constant-time candidate checks, and the recursion never runs
deeper than nine frames.

**Complexity:** `O(P)` time, `P` the valid pattern prefixes the search
visits — at most 389,497, for `m = 1, n = 9` — and `O(n)` space for the
recursion.
