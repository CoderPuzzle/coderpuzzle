# Solutions — Minimum Addition to Make Integer Beautiful

## Round up digit by digit

The only way to lower a digit sum is to carry: rounding `n` up to the
next multiple of `10` zeroes its last digit, rounding to the next
multiple of `100` zeroes the last two, and so on (hint 2). The greedy
loop repeats this for `10`, then `100`, then `1000`, ... until the digit
sum of the current value is at most `target`; the added amount is the
difference from the original `n`.

Why the first round that fits is minimal: the smallest beautiful value
greater than `n` must be a round-up of this form. If a value `m > n` is
beautiful and differs from `n` first at some position with a larger
digit, any non-zero digits after that position could be zeroed to make a
still-smaller beautiful value that stays above `n` — so a minimal `m`
has only zeroes after the carry, i.e. `m = ceil(n / 10^k) * 10^k` for
some `k`. The round-ups are non-decreasing in `k`, so the greedy's first
success is the minimum addition.

`n` reaches `10¹²`, so all arithmetic is done in 64-bit integers; each
iteration computes a digit sum in `O(log n)` and the loop runs once per
carried position.

**Complexity:** `O((log n)²)` time, `O(1)` space.
