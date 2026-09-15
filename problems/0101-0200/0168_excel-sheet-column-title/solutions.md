# Solutions — Excel Sheet Column Title

## Subtract one, then divide

An Excel column title looks like a base-26 numeral, but the digit set has no zero: A is 1 through Z is 26, and after Z comes AA, not a zero-carry. This is bijective numeration, and it breaks the ordinary conversion loop at both ends — `columnNumber % 26` yields 0..25 while the digits are 1..26, so remainder 0 has no letter and every carry lands one letter off. The failures concentrate exactly at the boundaries the statement shows: 26 must be `Z`, 27 must be `AA`, 52 must be `AZ`, and 703 must be `AAA`.

Subtracting one before each divide repairs both ends at once. After `columnNumber -= 1`, the digit values 1..26 sit on remainders 0..25 — remainder 0 is `A`, 25 is `Z` — and the unit this borrows from the higher letter is exactly the compensation that makes dividing by 26 produce the right value for the next letter out. The loop appends `chr(ord("A") + columnNumber % 26)` each iteration and halts when nothing is left; since positional division emits the least-significant letter first, the collected letters are reversed before returning.

Each iteration removes one letter, and 26⁶ < 2³¹ − 1 < 26⁷, so even the largest allowed input, 2147483647, is the seven-letter `FXSHRXW` — the loop runs at most seven times.

**Complexity:** `O(log n)` time, `O(log n)` space, in the number of letters of the answer.
