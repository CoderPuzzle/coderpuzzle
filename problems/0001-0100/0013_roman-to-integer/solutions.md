# Solutions — Roman to Integer

## One-pass scan with lookahead

A valid numeral behaves almost like a plain sum: symbols march from largest to smallest, so each one can simply be added to a running total. The only exception is the left half of a subtractive pair, and that exception is visible locally — a symbol strictly smaller than the symbol on its right is always the `I`, `X` or `C` of one of the six pairs `IV`, `IX`, `XL`, `XC`, `CD`, `CM`.

So a single left-to-right pass suffices. At each position the code looks up the symbol's value and compares it with the value of the next symbol: smaller means the pair is worth `right - left`, so the current value is subtracted; anything else — equal, larger, or no next symbol at all — is added. The last symbol has no right neighbor and belongs to no subtractive pair as its left half, so it is always added, which is exactly what the boundary check produces.

For `MCMXCIV` the pass adds 1000, subtracts 100 (`C` before `M`), adds 1000, subtracts 10 (`X` before `C`), adds 100, subtracts 1 (`I` before `V`), and adds 5, giving 1994. Correctness rests on validity, which the statement guarantees: in a well-formed numeral `smaller than the right neighbor` is precisely the subtractive positions, and no other.

**Complexity:** `O(n)` time, `O(1)` space (the value table holds a fixed seven entries).
