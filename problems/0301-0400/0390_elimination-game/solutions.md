# Solutions — Elimination Game

## The head that survives

After every round the survivors are still an evenly spaced run — head, then `head + step`, `head + 2·step`, and so on up to `n` — so the algorithm's whole state is three integers, and no round ever needs the list itself. A left-to-right round removes the first number first, so the head always dies and the new head is `head + step`. A right-to-left round walks its deletions in from the right end, and the deletion front only reaches the head when the count is odd — an even count stops one short of it, so the head survives while every other remaining number pairs off against a deletion. So the rule is one line: `head += step` exactly when the direction is left-to-right or the remaining count is odd; each round then doubles the gap, halves the count, and flips the direction. Example 1's trace is the walk itself — 9 numbers at head 1, step 1: left-to-right moves the head to 2 with 4 left at step 2; right-to-left over an even 4 leaves the head at 2 with 2 left at step 4; left-to-right moves it to 6, and 6 is the last number.

The count halves every round, so the loop runs until one number remains — about thirty rounds at the `10⁹` ceiling — with three integer updates each and nothing materialized. Every intermediate also stays inside the original range: while more than one number remains, the head plus the gaps behind it cannot pass the last survivor, so `head + step <= n` holds through the final shift and plain machine integers carry the whole computation.

**Complexity:** `O(log n)` time, `O(1)` space.
