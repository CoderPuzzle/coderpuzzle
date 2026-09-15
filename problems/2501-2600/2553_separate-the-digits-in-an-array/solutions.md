# Solutions — Separate the Digits in an Array

## Division-chain digit stripping with a reversal buffer

Each number hands over its digits one at a time under repeated division
by ten — the remainder chain yields `x % 10`, then `(x / 10) % 10`, and so
on — but that chain emits least-significant first, the reverse of reading
order. A six-slot buffer bridges the two directions because the value cap
`nums[i] <= 10⁵` bounds every number at six digits: lift a whole number's
digits into the buffer, then flush it back-to-front into the answer before
moving to the next input element. Since each buffer drains completely, the
numbers' own sequence in `nums` carries through untouched.

The only bookkeeping beyond the buffer is result sizing, which matters in
the languages with fixed-length arrays: one sizing pass counts total
digits up front (or the dynamic containers simply append). Both passes
touch each digit exactly once, driven by the smallest possible unit of
work — one `%` and one `/` per digit — with no string building, char-code
arithmetic, or recursion involved. Zero cannot appear inside `nums`, so
every division chain terminates at the empty prefix without a special
case, and single-digit numbers degenerate naturally to a one-slot lift
plus a one-slot flush.

**Complexity:** `O(d)` time over the `d = Σ digit-count(nums[i]) ≤ 6000`
output digits (linear in input plus output), `O(1)` auxiliary space beyond
the returned array.
