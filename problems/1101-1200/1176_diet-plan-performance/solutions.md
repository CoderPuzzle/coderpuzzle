# Solutions — Diet Plan Performance

## Rolling Window Sum

Consecutive windows overlap in all but one element: the window starting at
day `i` and the window starting at day `i + 1` share `k − 1` days. So after
summing the first `k` days once, each step is two operations — add the day
that enters, subtract the day that leaves. Every window total still gets
its own comparison: below `lower` costs a point, above `upper` earns one,
in between changes nothing.

The running total stays far inside 32-bit range — at most `10⁵` days times
20000 calories, about 2·10⁹ for the widest window, which fits in a signed
32-bit int only barely; the implementations use the plain 64-bit-safe
accumulation where the language needs it (Python integers are unbounded,
and the fixed-width ports accumulate in 64-bit). One pass, constant
bookkeeping.

**Complexity:** `O(n)` time over `n = calories.length`, `O(1)` extra space.
