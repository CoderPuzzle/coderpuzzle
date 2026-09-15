# Solutions — Remove All Adjacent Duplicates in String II

## Run-Length Stack

The key insight is that removals only ever concatenate the text immediately before and after the deleted block, so the surviving characters keep their relative order throughout the whole cascade. A stack of `(character, run length)` pairs can therefore simulate all removals in a single left-to-right pass: the stack always holds the compressed prefix that has not (yet) been deleted.

Each incoming character either extends the run on top of the stack — incrementing its count — or starts a new run with count 1. The moment a run's count reaches exactly `k`, that run is popped. Popping can make the run underneath and the next incoming characters equal, and they merge naturally on the following steps because the equality check looks at the current top after the pop. This reproduces the chain reaction of repeated removals without ever rescanning the string.

Checking equality against only the stack top (rather than the top `k` characters) is what makes the scan linear: the count does the bookkeeping that a naive solution would redo `k` times per position. The final string is reconstructed by expanding each surviving `(character, count)` pair in stack order. A string shorter than `k`, or with no run of length `k`, is returned unchanged since no run ever completes.

Example 2 (`s = "deeedbbcccbdaa"`, `k = 3`) cascades through the stack:

1. 'd' then 'eee' completes a run and pops; the following 'd' grows the d-run to 2.
2. 'bb' arrives, then 'ccc' pops; the next 'b' completes the b-run of 3 and pops.
3. The next 'd' pushes the d-run to 3 and pops it too, momentarily emptying the stack.
4. Only "aa" survives, so the final string is "aa".

**Complexity:** `O(n)` time, `O(n)` space.
