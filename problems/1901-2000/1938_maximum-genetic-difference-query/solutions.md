# Solutions — Maximum Genetic Difference Query

## Offline DFS with an Offline Binary Trie

Each query asks for the maximum XOR of `val` against any node value on the path from `node` up to the root. Answering the queries offline during one depth-first traversal makes all those path sets share a single data structure: insert a node's value into a binary trie on entry, answer every query attached to that node, and remove the value on exit. The trie then contains exactly the root-to-current-node path at all times, so a query at the current node is precisely a max-XOR lookup.

Maximizing XOR is the standard greedy trie walk: from the most significant of 18 bits (enough, since node values and query values stay below 2^18), descend into the child holding the complement of the query's bit when that subtree is non-empty — setting that result bit — and otherwise take the same-bit child. The trie is stored as flat parallel lists (`nxt` with two child slots per node, plus a per-node `count`) rather than nested objects, which keeps constant factors small and makes removal trivial: decrementing `count` along the inserted path, with `query_max` testing `count[cand] > 0` so abandoned branches are never followed.

The traversal itself is iterative with explicit `(node, exiting)` stack pairs, avoiding recursion limits at 10^5 nodes; queries are bucketed by node with their original indices so answers land in output order. Each node's value is inserted and removed once (18 trie levels each) and each query walks 18 levels once.

**Complexity:** `O((n + q)·B)` time with `B = 18` bits, `O(n·B)` space.
