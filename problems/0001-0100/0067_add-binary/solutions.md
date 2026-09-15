# Solutions — Add Binary

## Right-to-left carry loop

The solution adds the way pencil-and-paper binary addition does. Two indexes start at the right ends of `a` and `b`; each step takes one digit from whichever inputs still have one, plus the incoming carry, and emits `total % 2` as the next result digit while `total / 2` becomes the new carry. The loop keeps running while either input has digits left or a carry is pending, which folds everything special about the problem into one condition: unequal lengths need no padding, because the shorter string simply stops contributing, and a surviving final carry extends the answer on its own, so `"11" + "1"` grows to `"100"` with no post-loop special case.

Every per-step `total` is at most 3 (`1 + 1 + carry`), so the arithmetic fits in an ordinary machine integer in every language, and only single characters are ever converted, never the whole strings. That is exactly what the follow-up asks for: no `BigInteger`, no whole-string-to-integer shortcut, just digit-at-a-time schoolbook addition. The all-zero input needs no special handling either: `"0" + "0"` runs the loop exactly once with a total of 0 and emits the single digit `"0"`.

Result digits come out least-significant first and are collected in a growing array, then reversed once at the end. That keeps appending `O(1)` per digit instead of paying a prepend or front concatenation at every step, which matters at the `10⁴`-digit constraint limit.

**Complexity:** `O(max(m, n))` time, `O(max(m, n))` space.
