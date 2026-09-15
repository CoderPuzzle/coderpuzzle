# Solutions — Divide Two Integers

## Exponential search on the remainder

Division counts how many copies of the divisor fit into the dividend, and the statement only forbids the operators, not the arithmetic. Naive subtraction counts the copies one at a time, which is far too slow when the quotient is around two billion; doubling fixes that. The code repeatedly finds the largest `chunk` — the divisor doubled with addition until one more doubling would overshoot — subtracts that single chunk, and adds the matching `multiple` (also built by doubling from 1) to the quotient. Each pass rips off the leading power-of-two block of the quotient, so even the worst input finishes in a few dozen additions.

Signs are handled outside the loop: the quotient of the two magnitudes is computed, then negated exactly when the operands disagree in sign. Working on magnitudes is what makes truncation toward zero automatic — `-7` over `3` becomes `7` over `3`, quotient 2, sign reapplied as -2 — instead of the floor behavior a signed remainder would drag in. The one representability trap is `dividend = -2³¹` with `divisor = -1`: the true quotient is 2147483648, one past the 32-bit maximum, so that pair is clamped up front to 2147483647 per the statement's rule. Because `-2³¹` has no positive counterpart in 32 bits, C++, Java, Rust, and Go widen both operands to 64-bit before taking magnitudes; Python integers are unbounded and JavaScript doubles are exact through 2⁵³, so those two need no widening at all.

Every arithmetic step in every language is an addition, a subtraction, or a comparison — no multiplication, division, or remainder operator appears. The inner doubling stops while `chunk + chunk` is still at most the remainder, which also bounds the intermediates: the chunk never exceeds the dividend's magnitude (at most 2³¹) doubled once, comfortably inside 64-bit and exactly representable as a double.

**Complexity:** `O(log² n)` time in the magnitude `n` of the dividend — at most `log n` outer passes, each doing at most `log n` doublings — and `O(1)` space.
