# Solutions — Count No-Zero Pairs That Sum to N

## Digit DP with Carry and Started Flags

Counting pairs (a, b) with a + b = n is a column-by-column addition problem: choosing digits da and db at each decimal position must satisfy da + db + carry ≡ digit-of-n (mod 10), passing the new carry (da + db + carry) div 10 onward. The DP walks the digits of n from most significant to least (with one extra leading zero appended to verify the final carry is 0), maintaining counts over the state (incoming carry, a-started, b-started) and enumerating up to 100 digit pairs per position.

The started flags encode the no-zero requirement. For each number the counted digit patterns are exactly "a block of leading zeros, then nonzero digits continuing all the way down to the units position": while a number's flag is set its digit may be anything, but emitting a 0 ends the number — every more significant position of it is then forced to be 0 — and the units position additionally rejects digit 0 for both numbers outright. The answer is read from the final state with carry 0 and both flags set, which is precisely "both a and b are positive and zero-free", with counts kept modulo 10^9 + 7.

Because n ≤ 10^15 has at most 16 digits, the DP does a few hundred operations per position — eight state cells times at most a hundred digit pairs — making the whole computation effectively constant work in the digit count.

**Complexity:** `O(D)` time (D = number of decimal digits of n), `O(1)` space.
