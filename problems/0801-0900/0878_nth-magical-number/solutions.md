# Solutions — Nth Magical Number

Counting the magical numbers up to a bound is inclusion-exclusion over two
multiple sequences — the multiples of `a`, the multiples of `b`, minus their
overlap — and that count only grows, so the n-th magical number is the
smallest bound whose count reaches `n`, and halving a range finds it.

## Count by inclusion-exclusion, binary search the smallest bound

Exactly `x div a` multiples of `a` reach `x`, likewise `x div b` for `b`, and
the two sequences overlap precisely on the multiples of `lcm(a, b)`, so
`count(x) = x div a + x div b - x div lcm(a, b)` counts the magical numbers
up to `x`. The count never decreases, and it rises by one exactly on a
magical number, so the smallest `x` with `count(x) >= n` is itself magical
and is the n-th — binary search over `[1, A]` with `A = n * min(a, b)` finds
it, the ceiling being the n-th multiple of the smaller value and thus a
magical number certain to sit at or above the answer.

At the bound `n = 10⁹` with `a = b = 4 * 10⁴` the answer itself reaches
`4 * 10¹³`, so the fixed-width solutions carry the range ends, the midpoint,
and the least common multiple — computed as `a/g * b` off the gcd — in
64-bit integers; only the value already reduced below `10⁹ + 7` is narrowed
on return. Python's integers are unbounded, and the JavaScript and
TypeScript arithmetic stays exact far below `2⁵³`.

**Complexity:** `O(log A)` time, `O(1)` space.
