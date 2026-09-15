# Solutions — XOR Operation in an Array

## Direct simulation of the arithmetic progression

The array is never needed — only its running XOR. Element `i` is
`start + 2 * i`, so one pass folds each term into an accumulator with the
bitwise XOR and returns it. With `n <= 1000` and `start <= 1000`, every
term fits comfortably in a machine word, and no intermediate grows beyond
the largest term's bit width (XOR never carries).

**Complexity:** `O(n)` time, `O(1)` space.
