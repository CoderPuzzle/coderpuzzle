# Solutions — Self Dividing Numbers

## Test every digit by decimal decomposition

The scan over `[left, right]` is the whole job, and each candidate is judged
on a copy: peeling digits off the tail with `% 10` and integer division by
`10` walks the decimal writing from its last digit to its first while `n`
itself stays intact for the divisibility test. A digit of `0` rejects on
sight — it divides nothing, and the statement bars it anyway — and any digit
that leaves a remainder in `n % d` rejects as well, so the walk can stop at
the first offender. Survivors are appended as the scan reaches them, and the
scan runs upward, so the output is already in ascending order with no sort.

The zero digit is the trap the range hides. Every multiple of 10, and every
value like 100..110 or 1000..1001 whose writing carries a `0` in any
position, is rejected the moment that digit surfaces — which is why the
family 10..19 yields only 11, 12, and 15 (13, 14, and 16..19 carry no zero
but fail `n % d`), and why across the full bound 1..10000 only 339 values
survive: the survivors thin out fast as the writings lengthen.

Nothing in the arithmetic can strain a fixed-width integer. The bound caps
every value at `10⁴` — at most five digits — and every tested divisor is a
single digit 1..9, so all of it sits far inside 32-bit integers in every
language; the decomposition copy simply runs down to zero. The output array
is the only storage the pass needs, and it holds just the survivors, never
more than the range itself.

**Complexity:** `O(R·d)` time, `O(R)` space — `R` the range width, `d` the
digits per value; the space is the output itself.
