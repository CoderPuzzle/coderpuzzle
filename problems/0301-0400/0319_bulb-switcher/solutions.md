# Solutions — Bulb Switcher

## The surviving perfect squares

Watch a single bulb, bulb `i`. Round `d` touches it exactly when `d` divides
`i`, and since the statement runs rounds 1 through `n` over bulbs numbered 1
through `n`, bulb `i` ends up toggled once for each of its divisors. It starts
off, so it is on at the end precisely when its divisor count is odd — and
divisors pair up, `d` with `i / d`. The pairing leaves a divisor unpaired only
when `d = i / d`, that is when `i = d²` is a perfect square, so a square has an
odd divisor count and every other number an even one. Example 1's trace is the
smallest witness: bulb 1 is touched only in round 1 and stays lit, while bulbs
2 and 3 are each touched twice and end off — `[on, off, off]`, one bulb on.

The bulbs still on are therefore exactly the perfect squares `1, 4, 9, …`, and
the answer is how many of them lie in `1..n`: the largest `k` with `k² <= n`.
Squaring maps roots one-to-one onto squares, so counting squares is counting
their roots, and the answer is simply `floor(sqrt(n))`. `n = 0` runs no rounds
and returns 0, which is the same expression's value there.

Only the arithmetic of the square root needs care. Python computes the floor
exactly on integers with `math.isqrt`; the other six languages take a float
square root, and a raw truncation of one can in principle land a step below
the true floor when the float result sits just under a perfect square's root.
Rounding to the nearest integer and then settling the single comparison
`root * root > n` removes the hazard — the deciding test squares integers, so
no float participates in it. Within this problem's `10⁹` cap the hazard is
anyway unreachable: every `n` in range is exact in a double and IEEE square
roots are correctly rounded, leaving errors far below the half-integer it
would take to misround. The guard is insurance, not correction.

**Complexity:** `O(1)` time, `O(1)` space.
