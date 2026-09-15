# Solutions — Power of Two

## Low-bit clear

A power of two is exactly a lone set bit: `100…0`. Subtracting one borrows through that bit and turns the pattern into `011…1`, which shares no bit position with the original — so `n & (n - 1)` is zero precisely when `n` had a single bit set. The whole method is the one expression `n > 0 && (n & (n - 1)) == 0`, which answers the follow-up as stated: no loop, no recursion. A count-the-bits form (`popcount(n) == 1`) is equally correct but either leans on a library builtin or spends a loop counting bits the answer never needs; the low-bit form states the property itself.

The contract carries the width guarantee. `n` is a signed 32-bit integer, so the wire domain is `-2³¹` through `2³¹ - 1`: the positive half carries `0` through `2³¹ - 1`, and the largest power of two that fits is `2³⁰` — `2³¹` itself sits one past the cap and never arrives. Negative inputs arrive signed, and `-2³¹` is the trap: its two's-complement pattern is a lone set bit, exactly the shape the bit test looks for. The `n > 0` guard is what rejects it — and zero and every other negative — before the subtraction runs; because `&&` short-circuits, `n - 1` only ever evaluates for `n >= 1`, so it can never leave the signed range in any language.

Concretely, for `n = 16` the patterns `10000` and `01111` overlap nowhere, so the AND is zero and the answer is true. For `n = 3` the patterns `11` and `10` share their low bit, the AND is `10`, and the answer is false — any second set bit survives the AND. Zero and the negatives never reach the subtraction at all.

**Complexity:** `O(1)` time and `O(1)` space.
