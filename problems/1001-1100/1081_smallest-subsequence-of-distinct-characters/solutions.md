# Solutions — Smallest Subsequence Of Distinct Characters

## Greedy monotonic stack

Scan `s` left to right, building the answer in a stack. The key insight
is that a character can be safely removed once a lexicographically
smaller character appears later: dropping the larger one only improves
the prefix, and the removed character can be re-added at its later
occurrence.

Precompute, for each character, the index of its last occurrence. When a
character is not yet on the stack, pop every stack top that is strictly
greater than it and still has a later occurrence; skipping an already
stacked character is fine, since the stack is kept lexicographically
minimal at every step. Each character enters and leaves the stack at most
once.

**Complexity:** `O(n)` time, `O(n)` space.
