# Solutions — Alien Dictionary

## Topological Sort with a Min-Heap

Each adjacent pair of words constrains at most one letter pair: scanning the two words simultaneously, the first position where they differ gives an edge "that letter comes before this letter," and everything after is unconstrained (the words are already ordered by that point, so `break`). Two housekeeping rules complete the model: every letter appearing anywhere must be registered as a node even if it never participates in an edge, or those letters would be missing from the output; and if a longer word directly precedes its own prefix (`len(prev) > len(nxt)` and `prev.startswith(nxt)`), no ordering can sort them, so the empty string is returned immediately — this case produces no differing characters and would otherwise slip through silently.

The letters and edges form a directed graph, and a valid alphabet is a topological order of it. The solution runs Kahn's algorithm but drives the ready set with a min-heap instead of a FIFO queue: letters with in-degree zero are heapified, and each step pops the alphabetically smallest, appends it to the order, and decrements its neighbors. Always emitting the smallest available letter is precisely what makes the result the lexicographically smallest among all valid orders, which the problem demands when several topological orders exist. Duplicate edges between the same pair are filtered with an adjacency set, incrementing in-degree only the first time, so a repeated relation cannot strand a node.

If a cycle exists, the heap drains before every letter is emitted — nodes on or downstream of the cycle never reach in-degree zero — and the length check returns the empty string. Let C be the total number of characters across all words: building the graph costs O(C), and since the alphabet is capped at 26 letters and at most 26² edges, the heap and relaxation phases are bounded by a constant, making the input scan the only real cost. The graph and heap occupy constant space for the same reason.

**Complexity:** `O(C)` time, `O(1)` space.
