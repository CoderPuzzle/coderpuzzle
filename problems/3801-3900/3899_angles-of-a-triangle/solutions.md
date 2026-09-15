# Solutions — Angles of a Triangle

The side lengths first determine whether a non-degenerate triangle exists.
For a valid triangle, the law of cosines gives the angle opposite each sorted
side directly.

## Triangle inequality and law of cosines

Sort the three sides as `a <= b <= c`. A positive-area triangle exists exactly
when `a + b > c`; otherwise the answer is empty. For each side, rearrange the
law of cosines to compute the cosine of its opposite angle, clamp that value to
the mathematical interval `[-1, 1]`, and apply arccosine.

Angles grow with their opposite sides, so evaluating them in sorted-side order
already produces non-decreasing output. Rounding to five decimal places keeps
the result deterministic across runtimes while remaining within the required
`10⁻⁵` tolerance.

**Complexity:** `O(1)` time, `O(1)` space.
