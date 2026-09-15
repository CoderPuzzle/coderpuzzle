# Solutions — Count Beautiful Substrings I

## Running balance over every start

A substring has vowels == consonants exactly when its vowel-minus-consonant
balance is 0, and when that holds, both counts equal half its length, so
the divisibility condition is just ((length / 2) * (length / 2)) % k == 0.
With s at most a thousand characters, the enumeration the statement
suggests is small enough to be the whole solution.

For each start index, scan the rest of the string while maintaining the
running balance: adding a vowel raises it by 1, a consonant lowers it by 1.
Each time the balance returns to 0, the current substring has equal vowel
and consonant counts, and one multiplication with a modulo decides whether
it is beautiful. Every substring is examined exactly once per start, so the
work is quadratic in the string length with constant extra space; the
square of at most 500 fits comfortably in 32 bits.

**Complexity:** `O(n²)` time, `O(1)` extra space.
