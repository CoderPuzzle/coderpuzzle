# Solutions — Count Numbers with Non-Decreasing Digits

## Digit DP over Base-b Digits

The answer is count(r) − count(l − 1), where count(x) is the number of values in [0, x] whose base-b digits are non-decreasing. Since l and r can have up to 100 decimal digits, l − 1 is computed by string decrement, and each bound is converted to base b by repeated short division of its decimal string: one pass over the digit string produces the next base-b digit (the final remainder), and the process repeats until the string reaches zero. Digit counts are small (about 333 base-2 digits at most), so this conversion is cheap.

count(x) runs a bottom-up digit DP over the converted digits g[pos][last][tight][started]: tight caps the current digit at the bound's digit, started distinguishes leading zeros (before the number starts, any digit is allowed and "last" is irrelevant), and once started a digit d may be chosen only if d ≥ last, which directly enforces non-decreasing digits. The table is filled from the most significant position down to a base case of 1, taking values modulo 10^9 + 7, and the result is read from g[0][0][tight=1][started=0].

Edge cases: when l is "0" the decrement produces nothing and the subtracted count is 0; leading zeros never create false counts because the started flag separates them from genuine zero digits of the number; and b ranges only from 2 to 10, so the per-position digit loop is at most 10 wide.

**Complexity:** `O(D · (|r| + b²))` time (D = number of base-b digits), `O(D · b)` space.
