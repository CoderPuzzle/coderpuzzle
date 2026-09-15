# Solutions — Base 7

## Sign aside, divide by seven

The sign never touches the arithmetic. Stripping it first leaves the
magnitude, whose base-7 digits are exactly the digits of the signed answer,
so one loop serves both signs; the minus sign travels in a flag that is
prepended once the digits are settled.

That loop is repeated division: each round splits off the lowest digit as
the remainder by 7 while the quotient shifts everything else one place
down. Digits come out lowest-first and are reversed into the answer, and
stopping at zero is itself what keeps leading zeros out. Zero never enters
the loop, so it is answered directly as "0".

Every language spells the same division/modulo pair — Python's `divmod`
folds it into one call, JavaScript floors its floating division — and no
built-in base-conversion routine is called anywhere.

**Complexity:** `O(log₇ |num|)` time — one iteration per output digit — and
`O(1)` extra space beyond the output itself.
