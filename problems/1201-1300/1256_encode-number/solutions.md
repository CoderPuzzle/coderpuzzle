# Solutions — Encode Number

## Offset binary: length from bit length, value from the remainder

The table is the positive integers written in binary with the leading one
dropped, ordered by length. So the encoding of `num` splits into two parts:
the length is `bit_length(num + 1) - 1` (equivalently, the position of the
highest set bit of `num + 1`), and the content is `num + 1` with that highest
bit removed — the remaining low bits rendered most-significant first.

Both examples confirm it: `23 + 1 = 24 = 11000₂`, drop the top bit in a
5-bit field and `1000` remains; `107 + 1 = 108 = 1101100₂` leaves `101100`.

**Complexity:** `O(log num)` time, `O(log num)` space.
