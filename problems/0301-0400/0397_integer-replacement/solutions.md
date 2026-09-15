# Solutions — Integer Replacement

## Halve on even, read the low two bits on odd

Even `n` offers exactly one operation, so the whole problem lives in the choice
at an odd `n`, and the last two bits settle that choice. A number ending
`...01` (`n % 4 == 1`) should be decremented: the low 1 clears and the
halvings that follow ride a longer run of zeros, while incrementing would
carry into bits that are already 0 and pay for the disturbance later. A number
ending `...11` (`n % 4 == 3`) should be incremented: the carry ripples through
the entire trailing run of 1s and collapses it into a single higher bit,
retiring every 1 in the run at once, where decrementing would clear just one 1
and leave the next odd number immediately waiting.

The exception is `n = 3`, the one value where the run-collapsing argument
points the wrong way, because the run it would collapse is the entire number:
`3 - 1 -> 2 -> 1` takes two operations while `3 + 1` must go `4 -> 2 -> 1` for
three. Everywhere else the greedy step is at least as good as the alternative —
for odd `n > 3` it always matches an optimal play, a classification an
exhaustive search over the first million values confirms value by value.

The method is the rule itself, written as a plain recursion: one operation
plus the answer for the number it produces. The value halves at every other
step, so even the cap `2³¹ - 1` bottoms out in 33 nested calls and no stack in
the seven languages notices. The one arithmetic trap sits at that cap too —
incrementing `2³¹ - 1` computes `2³¹`, one past the signed 32-bit range — so
Java, C++, and Rust carry the recursion in a 64-bit integer and narrow only
the final count, while Go's `int` and JavaScript's doubles already hold every
value here exactly.

**Complexity:** `O(log n)` time, `O(log n)` space (the recursion stack is the
only storage).
