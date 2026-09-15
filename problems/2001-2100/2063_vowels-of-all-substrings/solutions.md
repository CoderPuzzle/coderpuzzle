# Solutions — Vowels of All Substrings

## Sum each vowel's contribution

A character at index `i` belongs to every substring whose start is one of the `i + 1` positions at or before it and whose end is one of the `n - i` positions at or after it. Therefore, a vowel at that index contributes `(i + 1) * (n - i)` to the total.

Scan the word once and add that contribution only for vowels. The total uses 64-bit integers in fixed-width languages because it can exceed signed 32-bit range; JavaScript and TypeScript remain exact for the stated maximum length.

**Complexity:** `O(n)` time and `O(1)` space.
