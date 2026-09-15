# Solutions — Convert Date to Binary

## Rebuild each component in base 2

The transformation never touches the calendar structure — it only rewrites
digits. Splitting the input on its dashes yields three decimal components,
each at most four characters long. Converting one component is ordinary base
change: read it as a plain integer (so the calendar's leading zero on a
one-digit month or day simply disappears) and write that value in binary.
Joining the three renderings back together with dashes, in the original
year-month-day order, produces the answer.

The subtlety worth noticing is which padding survives. Calendar notation
zero-pads month and day to two digits — `"02"`, `"29"` — while binary
notation has no use for leading zeroes, so month `2` becomes `"10"` and day
`29` becomes `"11101"` with no trace of the pad. The year keeps only its
natural bit length too: `2080` renders as `"100000100000"`. Since every
component is at most `2100 < 4096`, each needs at most twelve bits and the
whole output stays under two dozen characters no matter which valid date
arrives.

That bound makes the cost constant. The input is always ten characters, the
conversion touches three bounded numbers, and the output is a fixed handful
of bits joined by two dashes.

**Complexity:** `O(1)` time, `O(1)` space.
