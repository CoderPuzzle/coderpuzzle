# Solutions — Minimum Number of Operations to Sort a Binary Tree by Level

## Level-Order BFS with Cycle-Decomposition Swap Counting

Swaps are only allowed between nodes of the same level, so each level is an independent sorting problem and the answer is the sum over levels of the minimum swaps to sort that level's value array. The tree itself is just packaging: a standard BFS peels off one level at a time (draining exactly `len(queue)` nodes per round), handing each level's values to the counting routine.

The minimum number of swaps to sort a permutation is a cycle-counting fact: build the permutation that maps each current position to the position its value must occupy (via `sorted(level)` as the target and a value-to-position dictionary), decompose it into cycles, and each cycle of length `c` costs `c - 1` swaps — a swap can fix at most one element into its final slot, a cycle needs its length minus one to dissolve, and that bound is achieved by repeatedly swapping any misplaced element directly to where it belongs. Fixed points (values already in sorted position) are singletons costing nothing, which is why already-sorted levels like `[1,2,3,4,5,6]` contribute 0.

The implementation walks each level marking visited indices: when it lands on an unvisited, misplaced index it follows `pos[target[j]]` around the cycle until it closes, tallying the length, then adds `cycle - 1`. The visited array guarantees each index enters exactly one cycle walk.

Values are unique, which makes the position dictionary and the target permutation well defined. Total work is one BFS plus sorting each level once; the levels sum to `n` nodes, so the sorting phases add up to `O(n log n)`, and the cycle walks are linear in `n` overall since every index is visited a constant number of times.

**Complexity:** `O(n log n)` time, `O(n)` space.
