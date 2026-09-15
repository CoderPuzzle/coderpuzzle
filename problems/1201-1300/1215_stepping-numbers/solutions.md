# Solutions — Stepping Numbers

## Grow every stepping number from its first digit

There are too many integers in `[low, high]` to test one by one, but stepping
numbers are sparse — a value with more than 10 digits can never appear under
the constraint, and each prefix fixes its next digit to at most two choices.
So the algorithm _builds_ the answer instead of filtering for it: start a
queue with the ten one-digit seeds `0..9`, and repeatedly append the digit
`last - 1` and `last + 1` to a number ending in `last`, discarding the
out-of-range successors.

Every generated number is checked against `[low, high]` and collected; the
seeds enter the queue in ascending order and each extension strictly grows
the value, so the emitted numbers are already sorted — no final sort needed.
Growth stops at `high`: an extension of a number above `high` is larger still.

The working values are held in 64-bit integers because appending a digit to a
prefix near `2 * 10⁹` temporarily exceeds the 32-bit range before the range
check rejects it.

**Complexity:** `O(s)` time where `s` is the (tiny, constant-bounded) number
of stepping numbers up to `high` — under 4000 even at the constraint ceiling
— and the same space for the queue and output.
