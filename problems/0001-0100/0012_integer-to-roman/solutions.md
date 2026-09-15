# Solutions — Integer to Roman

## Greedy largest-first walk

The statement's rules convert one decimal place at a time, from the highest down, and each place is decided independently of the others. Folding the six subtractive forms — 4, 9, 40, 90, 400, 900 — into the seven plain symbols produces a thirteen-entry table that is already sorted descending, and walking that table greedily (take the largest value that still fits, append its symbol, subtract) reproduces exactly the choice the rules prescribe for each place. Greed is safe precisely because the table covers every digit shape: a place starting with 4 or 9 meets its subtractive form before the plain symbols could carve the digit up piece by piece, and a place starting with 1–3 or 5–8 is assembled by the plain symbols alone.

The code is a two-level loop over that table. For each `(value, symbol)` pair, an inner `while` appends the symbol and subtracts the value for as long as `num` still covers it; once it does not, the walk moves one entry down. No digits are extracted, no place values are computed, and no string is searched — the numeral simply accumulates in walk order, highest places first, which is the order the statement asks for.

The repeats are bounded by the rules themselves: powers of ten appear at most three times, the fives (`V`, `L`, `D`) at most once, and each subtractive form at most once. Since `num` never exceeds 3999, even `M` stops at three, so the longest possible output is fifteen symbols — 3888 is `MMMDCCCLXXXVIII` — and the work the method does is bounded by the table, not by the input.

**Complexity:** `O(1)` time, `O(1)` space.
