# Solutions — Remove K-Balanced Substrings

## Run-length stack with block cancellation

Every removal lives at a boundary where a run of '(' meets a run of ')': a
k-balanced substring is exactly the last k characters of some '(' run glued
to the first k characters of the ')' run that follows it, so a junction can
host a removal only when both of its runs have length at least k. Two
occurrences can never overlap — the pattern of k opens followed by k closes
cannot overlap itself — which means one pass removes one block from every
eligible junction independently, and the order in which those blocks go can
never change the final string. That license collapses the repeated passes
into a single left-to-right sweep over a stack of runs.

Each stack entry is one run: a parenthesis character plus its count.
Appending a character either grows the top run or pushes a new one, and any
time a ')' run comes to sit on a '(' run the junction settles on the spot:
cancel t = min(open // k, close // k) blocks, subtracting t·k from both
counts. A run that hits zero disappears, and its two neighbours — necessarily
the same character — merge into one run, which can open a fresh junction one
level down; the loop keeps settling until the top two runs are no longer an
open/close pair or neither side can fund a whole block of k. Once a junction's
smaller side drops below k it can never recover — its runs only shrink, and
no other junction ever touches them — so every junction is resolved once and
the sweep ends on the irreducible string.

Reading the surviving runs back out, each character repeated by its count,
gives the answer. Every character is pushed once and every canceled block is
removed once, so the work stays linear despite the nested loops.

**Complexity:** `O(n)` time, `O(n)` space.
