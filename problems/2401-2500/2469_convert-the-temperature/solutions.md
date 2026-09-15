# Solutions — Convert the Temperature

## Direct formula application

The statement supplies the two conversions verbatim, so the whole problem is
reading them into code: `kelvin` is the Celsius value shifted by the constant
`273.15`, and `fahrenheit` applies the linear scale `1.80` then adds the
`32.00` offset. Both formulas are evaluated once and packed into the
two-element answer `[kelvin, fahrenheit]` in that order.

No loops, tables, or branches are needed. The input is already a floating
point number, and the arithmetic is plain IEEE-754 double precision in every
language, so each output value agrees with the judge's expected value well
inside the accepted `10⁻⁵` tolerance. The rounding of the input to two
decimal places is supplied by the test data and never needs to be performed
by the solution.

**Complexity:** `O(1)` time, `O(1)` space.
