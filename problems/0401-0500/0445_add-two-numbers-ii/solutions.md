# Solutions — Add Two Numbers II

## Column addition off two stacks

The digits are most-significant first, so the two heads do not line up with
each other: whenever the lengths differ, the ones digits sit at opposite
ends, and column addition has to start at the ones. Pushing each list's
digits onto a stack as it is read reverses that reading order — the follow-
up's constraint — and leaves both least-significant digits on top, so
popping the two stacks adds the ones column first, exactly like grade-
school addition on paper. The input lists are only ever read.

A single loop pops from whichever stacks still hold digits, adds the
incoming carry, and splits the column total into the digit to emit and the
carry to propagate (`total / 10`, `total % 10`). Unequal lengths need no
case split — an empty stack simply contributes nothing — and a leftover
carry after both stacks drain emits one final leading digit, which is the
only way the result grows past the longer input.

The output must also be most-significant first, yet the digits are produced
least-significant first. Front-insertion dissolves that mismatch as the
loop runs: every new node is linked in front of the previous one, so the
head ends up holding the most significant digit without a second reversal
pass. The result has at most `max(n, m) + 1` nodes.

**Complexity:** `O(n + m)` time, `O(n + m)` space.
