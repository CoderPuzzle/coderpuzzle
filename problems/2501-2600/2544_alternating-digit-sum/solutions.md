# Solutions — Alternating Digit Sum

## Reverse Digit Scan with Sign Correction

Reading the digits from the low end makes extraction cheap — `n % 10`
yields the last digit and `⌊n / 10⌋` shifts the rest down — but it also
anchors the `+` sign at the least significant digit, whereas the
statement pins it to the most significant one. The fix costs nothing:
alternating signs already builds a valid sum for a `+`-anchored-at-the-
end reading, so only its direction depends on parity. When the number of
digits is odd, the first peeled digit sits on a position whose statement
sign is positive and the accumulated total is already correct; when the
digit count is even, every position's sign is flipped relative to the
statement's assignment and the final answer is simply the negation.

Concretely: keep `total`, `sign`, and a digit counter while peeling,
adding `sign · digit` each round and toggling `sign`. Return `-total` on
an even count, `total` otherwise. The answer can legitimately be
negative — any even-length input whose leading half outweighs its tail
produces one — which the two-digit case `12 → +1 − 2 = −1` exhibits.

The loop runs once per decimal digit, at most ten times for `n ≤ 10⁹`,
and the running total never leaves `±45`, so no language needs wide
arithmetic anywhere.

**Complexity:** `O(log₁₀ n)` time, `O(1)` space.
