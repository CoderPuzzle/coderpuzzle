# Solutions — Subtree Removal Game with Fibonacci Tree

## Sprague–Grundy recurrence

Let `H(k)` be the Grundy value of an order-`k` subtree when removing its root is an ordinary move. The Colon Principle gives `H(0) = 0` and `H(k) = 1 + (H(k - 2) XOR H(k - 1))`, with a missing negative-order child also worth zero. The actual tree root is different because taking it loses: before that forbidden move, its two child subtrees are independent games, so the initial Grundy value is `H(n - 2) XOR H(n - 1)`.

Iterate the recurrence while retaining only the two preceding values and the current child xor. Alice has a winning move exactly when the final xor is nonzero. The values remain small for the given range, and a standard integer is sufficient.

**Complexity:** `O(n)` time, `O(1)` space.
