# Solutions — Maximum XOR With an Element From Array

## Offline Queries with a Binary Trie

Maximizing an XOR value is a bit-by-bit greedy: starting from the most significant bit, prefer a candidate whose bit differs from the corresponding bit of `x`, because that sets the result bit to 1. A binary trie over the numbers supports this walk — at each level follow the child with the complement bit if it exists, otherwise the matching child. The per-query filter `nums[j] <= mi` is the complication, and it is removed by processing queries offline: sort `nums` and sort the queries by `mi`, then insert numbers into the trie in increasing order so that when a query is answered the trie contains exactly the values not exceeding its `mi`.

The trie uses 30 levels (bits 29 down to 0), which covers all values up to 10^9 since they are below 2^30. Insertion walks each number down the trie, creating child nodes on demand. A query whose threshold admits no elements yet (`ptr == 0`) is answered `-1`; otherwise the greedy descent accumulates the best XOR bit by bit, with `best |= 1 << bit` each time the desired complement child is available.

Because queries are sorted by `mi`, the insertion pointer only moves forward and each number is inserted exactly once, so the total work is a constant 30 node visits per inserted number and per query, plus the two sorts. Duplicate values simply traverse identical paths, and answers are written back through the query's original index carried in the sorted tuple.

**Complexity:** `O(N log N + Q log Q + 30 (N + Q))` time, `O(30 N)` space.
