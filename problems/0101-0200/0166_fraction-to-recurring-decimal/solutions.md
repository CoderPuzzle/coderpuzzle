# Solutions — Fraction to Recurring Decimal

## Long division with a remainder map

Elementary long division already contains the whole algorithm: divide, take the remainder, multiply it by ten, and repeat. With at most `d` distinct nonzero remainders, the digit sequence must either hit remainder zero — the expansion is finite, and the statement demands that finite string, parentheses or not — or revisit a remainder, from which point every digit is forced to repeat. A hash map from each remainder to the position of the digit it produced detects that revisit: when a remainder comes back, the recurring parentheses open exactly at its recorded position, so `4/333` becomes `0.(012)` and `7/12` becomes `0.58(3)`, with the pre-period kept outside the parentheses.

Signs live outside the arithmetic. The method divides magnitudes and prepends `-` exactly when the operands disagree, suppressing it when the numerator is zero so `0/-7` prints `0` rather than `-0`. Working on magnitudes is also what makes truncation of the integer part automatic, and it isolates the one representability trap: `-2³¹` has no positive 32-bit counterpart, so C++, Java, Rust, and Go widen both operands to 64-bit before taking absolute values — the arithmetic that follows stays small regardless, since every intermediate is a remainder below `2³¹` times ten. Python integers are unbounded and JavaScript doubles are exact through `2⁵³`, so those two need no widening at all.

The widening is not merely defensive: `-2³¹ / -1` really is `2147483648`, one past the 32-bit maximum. Division problems usually clamp such a quotient, but here the result is a string, so the widened magnitude prints out unchanged — the case that would overflow an `int` return type is just an ordinary input.

**Complexity:** `O(d)` time and space in the magnitude `d` of the denominator — the loop emits at most one digit per distinct remainder — bounded in practice by the statement's guarantee that the answer string stays under `10⁴` characters.
