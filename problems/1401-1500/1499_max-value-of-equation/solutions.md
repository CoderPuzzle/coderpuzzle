# Solutions — Max Value of Equation

## Monotonic Deque on y − x

The points arrive sorted with strictly increasing x, so for a pair i < j the absolute value resolves to xj - xi and the equation becomes yj + xj + (yi - xi). For each fixed j the best partner is therefore the earlier point with the largest value of y - x, subject to the window constraint xj - xi <= k. The problem collapses to a sliding-window maximum of the key y - x.

The solution keeps a deque of earlier indices whose keys are strictly decreasing, so the front is always the best candidate for the current j. Stale candidates are discarded first: while the front's x lies more than k behind xj, it is popped — points are processed in x order, so anything too far for the current j is too far for every later j as well. If a candidate survives, the equation value against the front is computed and the overall maximum updated. Finally the current point enters: while the back's key is at most the newcomer's key, that back index is popped, since it can never again beat the newcomer for a future j, and the new index is appended.

Popping ties is safe because the newer index has the larger x and therefore stays inside the k-window at least as long as the older one. Each index is appended once and popped at most once, so the pass is linear. The problem guarantees at least one legal pair exists, so the minus-infinity sentinel is always replaced by a real value.

**Complexity:** `O(n)` time, `O(n)` space.
