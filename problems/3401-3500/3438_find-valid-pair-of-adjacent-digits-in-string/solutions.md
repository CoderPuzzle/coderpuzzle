# Solutions — Find Valid Pair of Adjacent Digits in String

## Count first, then scan

The two validity conditions decouple cleanly. Whether a digit "appears in `s`
exactly as many times as its numeric value" is a property of the whole string,
not of any position, while the inequality and adjacency are purely local. So
the count of every digit is computed once up front into a 10-slot table (the
digits are `'1'`–`'9'`, so the digit's value indexes its own slot), and the
scan that follows never recounts anything: it walks adjacent pairs left to
right and hands back the first pair whose digits differ and whose table
entries both equal their numeric values.

If the scan runs off the end of the string no pair qualified, and the empty
string is returned. Both passes touch each character once, and the table is a
fixed size regardless of input length.

**Complexity:** `O(n)` time, `O(1)` space — a fixed 10-slot table.
