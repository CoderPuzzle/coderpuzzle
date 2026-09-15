# Solutions — Remove 9

## The base-9 bijection

Removing every integer whose decimal spelling contains a 9 leaves exactly the
integers spelled only with the digits 0-8 — and those are the base-9 numerals,
re-read as decimal. Counting in base 9 uses just the digits 0-8 and visits every
such string in order, so it skips precisely the numbers a 9 would disqualify:
the map "k-th 9-free number = base-9 digits of k" is a bijection that preserves
order in both directions, because both the base-9 value of a digit string and
its decimal re-reading increase with the string. The examples confirm it: `n = 9`
is `10` in base 9, and `n = 10` is `11`.

The answer is therefore nothing but `n` converted to base 9 — the sequence
itself is never enumerated, which the constraint ceiling `8 × 10⁸` would make
hopeless anyway. The loop peels one digit per iteration (`n % 9`, then divide
by 9) and lays it at the current power of 10, least significant digit first.
`9¹⁰ = 3,486,784,401` already exceeds the ceiling, so at most ten iterations
serve every allowed `n`.

The largest answer, at `n = 8 × 10⁸`, is `2,052,305,618` — below `2³¹ - 1`, but
with too little headroom to trust a 32-bit accumulator, so the fixed-width
languages carry the computation in 64-bit integers per convention (Python's
integers and JavaScript's doubles are exact far beyond this range).

**Complexity:** `O(log₉ n)` time, `O(1)` space.
