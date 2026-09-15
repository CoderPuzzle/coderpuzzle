# Solutions — Max Consecutive Ones

## One pass with a running count

The zeros cut the array into runs of 1s, and every element belongs to exactly
one run, so a single left-to-right pass can measure each run as it is read.
Two counters do all the work: `count` is the length of the run currently under
the cursor, and `best` is the longest run seen so far.

The rules are one line each. On a 1 the current run grows, so `count` gains
one and `best` is raised to at least `count`. On a 0 the run has just ended,
so `count` resets to zero and the next 1 starts counting from scratch. A run
reaches its full length only at its last 1 — either just before a 0 or at the
very end of the array — and updating `best` while the run grows records it
exactly there, so nothing needs rechecking after the loop. That final position
is also where the classic slip lives: a pass that updates `best` only when it
sees a 0 never scores a run that closes at the last element, and an input like
`[0,0,1,1,1]` would come back 0 instead of 3.

An array of all zeros never advances `count` past zero and the answer stays at
its initial 0, which is the correct longest run of 1s. The single-element
cases fall out the same way: `[1]` returns 1 the moment its lone run ends at
the array's end, `[0]` never updates anything.

**Complexity:** `O(n)` time, `O(1)` space.
