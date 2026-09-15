# Solutions — Maximum Product of Word Lengths

## 26-Bit Letter-Set Bitmasks

Whether two words share letters depends only on their _sets_ of distinct letters — order and multiplicity are irrelevant. The solution compresses each word into a 26-bit integer mask, setting bit `ord(ch) - ord('a')` for each letter present, and pairs each mask with the word's length.

With masks in hand, the share test is a single operation: two words have no common letter exactly when the bitwise AND of their masks is zero. The solver then checks all unordered pairs, keeping the largest product of lengths among pairs whose masks AND to zero, and returns 0 if no pair qualifies.

The cost splits in two. Building the masks is linear in the total input length `L` (up to 1000 words of up to 1000 characters). The pairwise phase is `O(n²)` over the `n` words — at most about half a million combinations for `n = 1000` — and each test is one AND and one multiply, so the quadratic loop is cheap in practice. This is exactly why the constraints stop at 1000 words: the quadratic phase is the deliberate design point rather than a liability.

Edge cases: words made from one repeated letter (the fourth example) all share that letter's bit, so every pair ANDs to nonzero and the answer is 0. Duplicate or subset words are handled naturally — the AND test does not care how the letters were chosen, and equal masks of different lengths simply compete through their lengths.

**Complexity:** `O(L + n²)` time, `O(n)` space.
