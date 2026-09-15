# Solutions — Design a Number Container System

## Per-Number Min-Heap With Lazy Deletion

Two maps describe the whole state. The first, `index -> number`, is the
container itself: `change` writes into it directly, and replace semantics
cost nothing — an index simply swaps owners. The second, `number -> heap of
indices`, answers `find`. Every `change` also pushes the index onto its new
number's heap, so each heap holds a superset of the indices currently
carrying that number: the smallest live entry is the answer to `find`.

The catch is that entries go stale. When an index is refilled with a
different number, the old number's heap still carries that index, and no
cheap way exists to remove it from the middle of a binary heap. Lazy
deletion sidesteps the problem: stale entries are left in place and
discarded only when they get in the way. `find` inspects the top of the
heap and pops while the top's slot now holds something else; the first
surviving entry is the smallest current index, because refills only ever
invalidate specific entries without hiding any smaller live one beneath
them. A duplicate `change` with the same index and number writes nothing at
all — skipping the push keeps heaps from bloating on repeated calls.

The total work stays bounded because every pushed entry can be popped at
most once across the whole run: `change` costs one push, and each pop in
`find` is paid for by some earlier push, so a stream of `m` calls does
`O(m log m)` heap work altogether.

**Complexity:** `O(log m)` amortized per call (lazy deletion over `m`
calls), `O(m)` space.
