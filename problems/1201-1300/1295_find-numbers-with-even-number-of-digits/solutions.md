# Solutions — Find Numbers with Even Number of Digits

## Count digits by repeated division

The digit count of a positive integer is how many times it can be divided
by 10 before reaching zero — each division sheds exactly one digit. So the
check is a tiny inner loop per element: halve... rather, tenth the value
with integer division until it hits zero, tallying steps, and count the
element when that tally is even. No string conversion, no logarithm with
its floating-point edge cases at exact powers of ten, just integer
arithmetic.

Every value lies in `1 .. 10^5`, so the loop runs at most six times per
element and the whole array of up to 500 numbers is processed in a few
thousand operations. A counter accumulates the elements whose step count
was even; that counter is the answer. Values are strictly positive by the
constraints, so there is no zero or negative special case to guard — the
loop body executes at least once for every input.

**Complexity:** `O(n * d)` time where `d <= 6` is the digit bound (so linear
in practice), `O(1)` space.
