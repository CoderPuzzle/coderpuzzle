# Solutions — Maximum Score After Binary Swaps

## Left-to-right max-heap sweep

A `'1'` only ever moves left, and two `'1'`s never pass each other, so a
final configuration is any increasing set of positions `q` whose t-th
smallest entry is at most the t-th `'1'`'s starting index — and every such
set is reachable by bubbling `'0'`s rightward. The score of a final
configuration is the sum of `nums` over that set, so the task is to pick,
for each `'1'` in left-to-right order, one unused position at or before
its own start, maximizing the total.

Scan the indices once, left to right, keeping a max-heap of the values
seen so far: every index offers its value as a candidate final slot, and
when a `'1'` is met it claims the best slot offered so far by popping the
heap. The greedy is optimal by majorization: right after the t-th `'1'`
(at index `p`) is served, the t popped values are exactly the t largest
values among `nums[0..p]`, while the first t claims of any feasible
assignment are t distinct values from that same prefix — so the greedy's
partial sum dominates at every step, and the totals compare at `t = k`.
The score is at most `10⁵ · 10⁹ = 10¹⁴`, so it accumulates in a 64-bit
integer (in JavaScript, `10¹⁴` sits far below `2⁵³`, so `Number`
arithmetic stays exact).

**Complexity:** `O(n log n)` time, `O(n)` space.
