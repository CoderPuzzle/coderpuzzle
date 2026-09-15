# Solutions — Minimum Fuel Cost to Report to the Capital

## Post-Order Subtree Sizes with Carpool Counting

Everyone in a subtree must eventually cross the edge that connects that subtree to its parent, and each car crossing that edge burns one liter. So the total fuel is the sum, over all edges, of the number of cars that cross it — and the only question is how few cars can carry a subtree's people across its top edge. With `s` people and `seats` seats per car, that minimum is `ceil(s / seats)`: people may consolidate freely at any city, so one full car is the densest possible crossing, and fractional cars do not exist.

That yields the whole algorithm. Root the tree at the capital; for each non-root node `u`, let `size[u]` be the number of representatives in `u`'s subtree (including `u`). The edge from `u` to its parent is crossed by exactly `ceil(size[u] / seats)` cars, contributing that many liters, and the answer is the sum over all nodes except the root. Carpooling deeper in the subtree never reduces the count at the top edge below this ceiling, and cannot help anywhere else either — subtrees nested inside contribute their own crossings independently.

The implementation is recursion-free for the `10^5`-node limit: a BFS from the root records `parent` and a visit order whose reverse processes children before parents, so one backward sweep accumulates `size[parent[u]] += size[u]` while adding `(size[u] + seats - 1) // seats` to the fuel total — integer ceiling division without floats. The root's own edge does not exist and is skipped; the `n == 1` degenerate case returns 0 immediately.

Each node and edge is touched a constant number of times, giving linear time overall. Fuel sums can reach about `n` liters even with one seat, so plain integers suffice.

**Complexity:** `O(n)` time, `O(n)` space.
