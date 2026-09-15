# Solutions — Minimum Operations to Make Array Parity Alternating

The answer pairs a count with a width, and both fall out of one observation:
a parity alternating array must follow one of two templates, and every
element already fits exactly one of them at its index.

## Two-template scan with slack bounds

An alternating array follows the even-first pattern (index `i` wants parity
`i mod 2`) or the odd-first one. A single operation flips the parity of
exactly one element, so a template that disagrees with `nums` in `d` places
needs at least `d` operations — and `d` are enough, since nudging each
disagreeing element once, in either direction, fixes its parity. Each
element agrees with exactly one template at its index, so one left-to-right
pass scores both candidates and `answer[0]` is the smaller count.

Spending exactly `answer[0]` operations leaves no slack: the final array must
follow a minimum-cost template, every operation must land on one of its
disagreeing elements, and each such element is touched once — any other
allocation wastes an operation or leaves a disagreement behind. Each touched
element therefore settles at `v - 1` or `v + 1`, the choice free and
independent, while every other element keeps its value. That final array fits
a window `[L, L + w]` exactly when each pinned `v` lies inside it and each
touched element has `v - 1` or `v + 1` inside it, which squeezes `L` between
`hi = max(pinned v, touched v - 1)` and `lo = min(pinned v, touched v + 1)`;
the tightest width is `hi - lo`. When the template pays at least one
operation the array has length at least 2 and alternates, so its spread is
at least 1 — the bounds alone can collapse below that
(`nums = [10, 10]` gives `hi - lo = 0`), so the width is clamped at 1.

The two templates tie whenever both counts are equal (the counts sum to `n`,
so a tie needs an even `n`); the answer then keeps the narrower side. Values
stay within `±10⁹`, so every bound fits 32-bit integers and the width never
exceeds `2 × 10⁹ < 2³¹ - 1`; the typed solutions still compute the width in
64-bit arithmetic before returning it. The scan is one iterative pass with
six accumulators, so no language risks recursion depth.

**Complexity:** `O(n)` time, `O(1)` space.
