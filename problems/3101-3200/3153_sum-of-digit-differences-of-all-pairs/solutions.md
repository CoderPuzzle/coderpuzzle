# Solutions — Sum of Digit Differences of All Pairs

## Column census

Pairs that agree on untouched columns differ at a specific position
independently of every other position, so the total decomposes into one
per-column problem. For a fixed digit position, only how many numbers
carry each digit matters: if `c` numbers carry a given digit there,
that digit accounts for `c * (n - c)` pair-endpoints, and since every
differing pair gets counted once from each side, halving the column sum
over digits yields the number of differing pairs at that column. All
numbers share their digit count, so every entry passes through exactly
the same set of columns.

The code walks columns left-to-right by an increasing place divisor,
bins each number's digit at the current column into ten counters, adds
the halved complement sums, and stops once the divisor passes the
leading digit. The accumulator stays exact in JavaScript doubles —
the worst case here is under `0.45 * 9 * n^2`, about `4.05 * 10^10`,
well below `2^53` — while fixed-width languages widen the counting to
64-bit because it runs far past what an `int` holds.

**Complexity:** `O(d * n)` time for `d` digits (`d <= 9`), `O(1)` space.
