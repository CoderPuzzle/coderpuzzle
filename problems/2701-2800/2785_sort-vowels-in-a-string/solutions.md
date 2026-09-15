# Solutions — Sort Vowels in a String

## Extract, sort, and reinsert the vowels

Consonants never move and vowels only ever trade places with other
vowels, so the whole permutation is decided by the multiset of vowel
values: collect every vowel of `s` in one pass, sort them by ASCII value,
then walk `s` again, pouring the sorted vowels into the vowel positions
left to right while leaving each consonant untouched. Refilling the fixed
vowel slots in ascending order is exactly what makes the vowel
subsequence of the result nondecreasing, which is all the statement asks.

The ASCII ordering has one subtlety worth pausing on: every uppercase
letter sorts before every lowercase letter, so `'O'` (79) comes before
`'e'` (101) — that is why `"lEetcOde"` becomes `"lEOtcede"`, and a plain
case-insensitive reading of "sorted" would misorder it. `'y'` is a
consonant here and never enters the collected pool, so a string with no
vowels like `"lYmpH"` comes back unchanged.

**Complexity:** `O(n log n)` time, `O(n)` space.
