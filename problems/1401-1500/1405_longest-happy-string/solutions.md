# Solutions — Longest Happy String

## Greedy: always append the most plentiful allowed letter

At every step append the letter with the largest remaining budget, unless that letter has just been placed twice in a row — then take the second most plentiful instead. Prioritizing the majority letter is what makes the string as long as possible: spending a rare letter while a common one dominates leaves the common letter stranded at the end, forced into an `aaa`/`bbb`/`ccc` run; interleaving with the minority letters absorbs the surplus. The two-in-a-row check against `result[-1]` and `result[-2]` is the only rule needed to keep every block at length at most two.

The implementation re-ranks the three letters each iteration by `(-count, letter)` — count descending, ties broken alphabetically for determinism — and takes the head. If that head has budget 0 the loop ends: no letter remains. If the head is the blocked letter, it falls back to the runner-up; the runner-up having budget 0 (only one letter left, already doubled) also ends the loop, correctly capping the string rather than emitting a forbidden triple.

Termination is guaranteed since each iteration appends exactly one character and budgets only decrease; the loop stops when neither the top nor second choice is usable. The result can never be extended further at that point: either all budgets are spent or every remaining letter would create a run of three.

Edge cases: a budget of 0 for one or two letters from the start (`c = 0` in the example) simply drops that letter from consideration, and inputs like `a = 7, b = 1` end with `b` exhausted and the remaining `a`s doubled and stopped. Ranking only three items keeps each step constant work.

**Complexity:** `O(a + b + c)` time, `O(a + b + c)` space for the output.
