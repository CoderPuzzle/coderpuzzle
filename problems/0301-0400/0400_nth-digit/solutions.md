# Solutions — Nth Digit

## The digit-block walk

The sequence is the positive integers written out in order, so its digits come
in uniform runs. The nine 1-digit numbers contribute 9 digits (positions 1
through 9), the ninety 2-digit numbers contribute 180 (positions 10 through
189), the nine hundred 3-digit numbers contribute 2700 (positions 190 through
2889), and in general the d-digit block contributes `9 × 10^(d-1) × d` digits
and starts at the number `10^(d-1)`. That table is the whole problem: no digit
of the sequence ever has to be generated, only located inside a block.

The walk carries three counters — the current digit length `d`, the current
block's digit budget, and the block's first number `base` — and subtracts whole
budgets while `n` is larger than the current one. When the subtraction stops,
`n` is a 1-based offset into block `d`, and two divisions finish the job: the
digit belongs to the number `base + (n - 1) / d`, at offset `(n - 1) % d`
within that number's decimal text. Example 2 runs the whole route: `n = 11`
gives up 9 to the one-digit block, leaving 2 inside the two-digit block that
starts at 10; `(2 - 1) / 2 = 0` selects the number 10 and `(2 - 1) % 2 = 1`
its second digit, the 0.

The loop advances one digit length per iteration, and the nine-digit block
alone spans 8.1 × 10⁹ digits — already past the constraint ceiling
`2³¹ - 1 = 2,147,483,647` — so at most nine iterations serve every allowed
`n`. Budgets that large overflow 32 bits, which is why the walk runs on 64-bit
counters in the fixed-width languages (Python's integers and JavaScript's
doubles are already exact far beyond this range), while the number holding the
answer never exceeds 250,954,973 — comfortably a plain machine integer.

**Complexity:** `O(log n)` time, `O(1)` space.
