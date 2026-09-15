# Solutions — Convert to Base -2

## Repeated division with a non-negative remainder

Base -2 still lets each digit be pulled off one place value at a time,
the same way base-2 extraction works: the least-significant digit is
`n` reduced modulo the base, and what remains is divided by the base to
expose the next digit. The only wrinkle is the negative base — dividing
by `-2` repeatedly flips the sign of the running value every step, so a
remainder that a language's native `%` reports as negative has to be
corrected back into `{0, 1}` before it is recorded, and the value carried
into the next iteration has to be adjusted to match.

Concretely: `remainder = n % 2` (whatever sign convention the language's
operator uses), and if that comes out negative, add `2` to land on `0`
or `1` — the only two values a base-(-2) digit can take. The next value
is `(n - remainder) / (-2)`; `n - remainder` is always an exact multiple
of `2`, so this division is exact and its result is the same integer in
every language regardless of how that language rounds inexact
quotients — there is nothing to round. The loop stops once `n` reaches
`0`, and `n = 0` itself is handled directly as `"0"` since the loop body
never runs for it. Digits come out least-significant first, so the
collected string is reversed before it is returned.

Tracing `n = 3`: digit `1` (n becomes `-1`), digit `1` (n becomes `1`),
digit `1` (n becomes `0`) — reversed, `"111"`, matching the base -2
identity `(-2)^2 + (-2)^1 + (-2)^0 = 3`. The magnitude of `n` never grows
across iterations, so no value in the process exceeds the input's own
32-bit range.

**Complexity:** `O(log n)` time, `O(log n)` space for the output string.
