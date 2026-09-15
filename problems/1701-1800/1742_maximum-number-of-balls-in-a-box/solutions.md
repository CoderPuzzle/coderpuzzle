# Solutions — Maximum Number of Balls in a Box

Each ball numbered `x` is filed into box `digit_sum(x)` — ball 321 into box
6, ball 10 into box 1 — and the answer is the fullest box once every ball
from `lowLimit` to `highLimit` is filed. Where each ball goes is fully
determined, so the whole task is a tally: walk the range, sum each number's
digits, and keep one counter per box.

## Digit-sum tally

A box number is a digit sum, and with `highLimit <= 10^5` the largest digit
sum any ball can have is 45 (from 99999), so a 46-slot counter indexed by
digit sum covers every box the range can reach. Sweep `x` from `lowLimit`
to `highLimit`, strip `x`'s digits one at a time with `% 10` and integer
division by 10, add one to the slot the sum names, and finish with the
largest slot.

Example 1 is the sweep in miniature: 1 through 9 each fill their own box,
then 10's digits fold back into box 1, which ends with two balls and wins.
The full-domain range `1..10^5` piles 6,000 balls into its densest box,
while a single-ball range leaves its lone box at one. No slot ever holds
more than the range length `n <= 10^5`, so a 32-bit counter never comes
close to overflowing.

**Complexity:** `O(n * d)` time (`d` = digits), `O(1)` extra space.
