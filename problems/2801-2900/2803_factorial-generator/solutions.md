# Solutions — Factorial Generator

## Running Product Yielder

Carry the running factorial in one accumulator and yield it as it grows.
The accumulator starts at the defined base 1 — the statement fixes 0! =
1, and that same value is 1!, so the very first `.next()` returns 1 for
every n (which is why n = 0 yields exactly `[1]`) — and each further
step multiplies by k for k from 2 through n, yielding after every
multiplication. The k-th value handed to the caller is therefore k!,
produced with one multiply and one yield per step and no recursion, no
memo table, and no re-scanning of earlier terms.

Exactness needs no big-number machinery anywhere in the domain: n is
capped at 18 by the constraints, 18! = 6402373705728000 stays below
Number.MAX_SAFE_INTEGER = 2^53 - 1 = 9007199254740991, and the prefix
products only grow toward that final value, so every intermediate
product and every yielded number is a safe integer and plain Number
arithmetic is lossless throughout. Each `.next()` does constant work,
so driving the generator to completion costs time linear in n with
constant auxiliary space beyond the emitted values.

**Complexity:** `O(n)` time, `O(1)` space.
