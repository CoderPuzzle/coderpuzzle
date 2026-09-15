# Solutions — Add Digits

## Digit-sum rounds

The code is the statement's own process carried out literally. While `num`
still has more than one digit, one round replaces it by the sum of its
digits: the inner loop peels digits off the low end with `% 10` and `/ 10`,
folding each into a running total, and the outer loop repeats until the value
drops below 10. The loop condition `num >= 10` is exactly "the result has
only one digit" turned inside out, so whatever value survives the loop is the
answer — for `38` the rounds walk `38 -> 11 -> 2`, exactly the trace the
statement shows.

Termination is never in doubt because each round is brutally contractive: a
value with `d` digits maps to at most `9 * d`, so even the largest input the
constraint allows — ten digits — falls to at most 90 in the first round, and
at most 9 within one more. Every visit to the outer loop except the first
therefore works on a two-digit number, which makes the whole computation a
handful of digit passes. The endpoints need no special care: `0` and every
single-digit input fail the condition immediately and return themselves. The
follow-up's loop-free answer does exist — the repeated digit sum is the
digital root, `0` if `num == 0`, else `1 + (num - 1) % 9` — but this solution
prefers to simulate the described process and stay identical in every
language.

**Complexity:** `O(log num)` time, `O(1)` space.
