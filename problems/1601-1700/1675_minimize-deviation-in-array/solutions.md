# Solutions — Minimize Deviation in Array

## Max-Heap Halving

Every odd number can be doubled exactly once (after which it becomes even and can only shrink), so a uniform normalization helps: multiply each odd value by 2 up front. From that starting state, every element's only remaining move is halving while even, and the deviation is `max - min` of the current multiset. Any reachable configuration is covered, because an odd value's doubled state is an intermediate point of the same chain.

Keep all values in a max-heap (negated for Python's min-heap) and track the current minimum explicitly. Repeatedly take the maximum; if it is even, halve it and push the result back, updating the minimum and the best deviation seen so far. The loop stops as soon as the maximum is odd — no element can grow anymore, so the maximum will never decrease again and no better deviation can appear.

Each halving reduces a value, and a value can be halved at most about `log₂(max)` times before becoming odd, so the total number of heap operations is bounded by `n log M` for the largest input value `M`. The initial best is computed before any halving so the untouched configuration counts too, and heaps of all-odd (after normalization) arrays exit immediately.

**Complexity:** `O(n log M log n)` time, `O(n)` space, where `M` is the maximum input value.
