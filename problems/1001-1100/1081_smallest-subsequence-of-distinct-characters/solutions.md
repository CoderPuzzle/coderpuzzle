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

![On s = bcabc the stack holds b, c when the second a arrives at i = 2; since last[c] = 4 and last[b] = 3 reoccur later, a pops c then b, pushes a, and the stack ends as the lexicographically smallest abc.](figures/solution-greedy-stack-pops.svg)

**Complexity:** `O(n)` time, `O(n)` space.
