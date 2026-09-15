# Solutions — Longest Palindromic Path in Graph

## Bitmask DP Expanding Palindrome Endpoints

Rather than walking a path forward and testing palindromicity at the end, build it outward from the middle. The memoized state is (mask, left, right): the set of visited nodes and the current two endpoints of the path, with the invariant that the visited nodes always spell a palindrome read left-to-right from left to right. A move appends one new node u adjacent to left and one new node v adjacent to right, requiring u ≠ v, both unvisited, and label[u] == label[v] — matching outer characters keep the string palindromic. The state value is the best path length reachable, at least the current popcount of mask since the standing path already qualifies.

Every palindrome has a center: odd-length ones start the recursion from a single node (mask = 1 << i, both endpoints i), even-length ones from an adjacent pair with equal labels. The answer is the maximum over all 2n such seeds. Because the endpoints start equal for single-node seeds and moves always add a genuine pair, odd and even lengths are covered without overlap.

n ≤ 14 keeps 2^n · n² states in reach, and each state only scans the neighbor lists of its two endpoints (at most Δ² pairs, Δ being the maximum degree), each scan entry either rejected in O(1) or resolving through the lru_cache. The graph has at least n − 1 edges (it is connected), but the DP never assumes connectivity beyond adjacency.

**Complexity:** `O(2^n · n² · Δ²)` time (Δ = maximum degree), `O(2^n · n²)` space.
