# Solutions — Replace Non-Coprime Numbers in Array

## Stack that drains leftward on every push

Process values left to right onto a stack of finished elements. A freshly
pushed value can only ever interact with what is already to its left, so
while the stack top shares a factor with it, pop the top and replace the
value with their LCM — repeating until the new value copes with whatever
remains on top or the stack empties. Each element enters and leaves the
stack once; the draining loop just keeps folding the absorbed tops into
one running LCM. Because any merge order converges to the same final
array, this greedy left-absorption produces exactly the required result.

**Complexity:** `O(n log M)` time for `n` values bounded by `M` (each
absorption at least halves a factor structure; gcds dominate), `O(n)`
space.
