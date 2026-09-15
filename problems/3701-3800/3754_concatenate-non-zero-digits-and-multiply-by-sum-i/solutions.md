# Solutions — Concatenate Non-Zero Digits and Multiply by Sum I

## Single arithmetic digit peel

The whole construction happens inside one left-to-right walk over `n`'s
decimal digits, and that walk never needs the digits stored — only
accumulated. Peel `n` apart from its least significant end with `digit =
n % 10` and `n //= 10`; every nonzero digit joins an accumulator `x` at
the place slot it earns (`x += digit * place`, then `place *= 10`) and
joins a running digit sum as well, while zero digits fall through without
touching either. Because both accumulators fill from the least significant
side in encounter order, the surviving digits end up packed into `x`
exactly in their original relative order — the concatenation the statement
asks for.

The loop terminates when the quotient hits zero, which also settles the
degenerate input: `n = 0` (or any all-zero digit string) never enters the
loop body's accumulate branch, leaving `x = 0` and sum `0`, so the product
is 0 as required. The final answer is one multiplication of the two
accumulators. Nothing else is tracked: no string round-trip, no buffer,
constant work per digit.

The bounds keep every intermediate exact: `n <= 10⁹` leaves at most nine
surviving digits, so `x <= 999999999` and `sum <= 81`. The product reaches
at most `999999999 * 81 = 80999999919`, which overflows 32-bit integers —
so the fixed-width languages carry it in 64 bits (`long long`, `long`,
`int64`, `i64`) and declare that the return type — while still sitting far
below JavaScript's exact-integer bound of 2⁵³, where plain numbers
multiply exactly; Python integers are unbounded. Nine iterations bound the
whole computation regardless of input shape.

**Complexity:** `O(log n)` time, `O(1)` space.
