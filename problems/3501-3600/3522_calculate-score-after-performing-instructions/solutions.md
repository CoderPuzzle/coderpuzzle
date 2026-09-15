# Solutions — Calculate Score After Performing Instructions

## Linear walk with an executed flag

The process is deterministic, so the score is whatever a faithful
simulation produces. The key observation is that every index executes at
most once: the rules explicitly end the process when an instruction would
be revisited. A boolean `executed` flag per index therefore turns each step
into O(1) work — mark the current index, apply the "add" rule (add
`values[i]`, move to `i + 1`) or the "jump" rule (move to
`i + values[i]`, score untouched), and stop as soon as the next position is
out of bounds or already marked. The revisited instruction is deliberately
not executed, which falls out of checking the flag before running the body.
Total work is a single pass over at most `n` executed instructions.

The score needs 64-bit arithmetic: every "add" instruction contributes at
most `10⁵` in magnitude and there can be `10⁵` of them, so the final score
can reach `10¹⁰`, well past the 32-bit range. (JavaScript's Number stays
exact here — `10¹⁰` is far below `2⁵³`.) No recursion is involved, so the
walk cannot overflow any call stack.

**Complexity:** `O(n)` time, `O(n)` space.
