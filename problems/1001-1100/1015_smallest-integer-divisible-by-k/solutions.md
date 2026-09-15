# Solutions — Smallest Integer Divisible by K

## Modular simulation

The repunit itself is never built -- for `k` up to `10^5` it can run to
tens of thousands of digits, far past any fixed-width integer. Only its
remainder mod `k` matters, and appending another `1` turns `n` into
`n * 10 + 1`, so the remainder updates the same way:
`remainder = (remainder * 10 + 1) % k`.

A repunit's last digit is always `1`, so it is never divisible by `2` or
by `5`; when `k` is even or a multiple of `5`, the answer is `-1` without
running the simulation at all.

Otherwise the remainder is walked forward one digit at a time, starting
from length `1`. There are only `k` possible remainders, so by the
pigeonhole principle either a remainder of `0` turns up within the first
`k` lengths, or it never will -- continuing past `k` steps would only
repeat remainders already seen. So the loop stops after `k` iterations
and returns `-1` if none of them hit `0`.

**Complexity:** `O(k)` time, `O(1)` space.
