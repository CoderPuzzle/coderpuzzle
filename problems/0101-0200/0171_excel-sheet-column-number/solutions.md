# Solutions — Excel Sheet Column Number

## Multiply by 26, add the digit

An Excel column title is a bijective base-26 numeral: its digits run 1 through 26 (A through Z) with no zero, which is exactly what makes the inverse direction, number to title, off-by-one-prone. Decoding has no such trap. Read as an ordinary positional numeral, a title of length L is the polynomial sum of `dᵢ · 26^(L−1−i)` where each digit is `letter − 'A' + 1`, so `"ZY"` is 26·26 + 25 = 701 and `"AAA"` is 26² + 26 + 1 = 703.

Horner's rule evaluates that polynomial in a single left-to-right pass with one accumulator: each new letter multiplies everything collected so far by 26, shifting it one place left, and adds its own digit value. No reversal, no borrow, no boundary case at Z — every letter maps to a plain 1..26 digit, so unlike the encode side the fold needs no repair at all.

The width is exactly tight. The constraint's ceiling `"FXSHRXW"` evaluates to 2147483647 = 2³¹ − 1, the signed 32-bit maximum, and the accumulator only grows toward its final value, so a 32-bit int never overflows mid-fold — the cap was chosen to make `int32` precisely sufficient.

**Complexity:** `O(n)` time, `O(1)` space, where `n` is the length of `columnTitle`.
