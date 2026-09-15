# Minimum Number of Steps to Make Two Strings Anagram

## Approach: Letter-frequency deficit

Only the letter counts matter — order never does, for an anagram. A
replacement in `t` changes exactly one letter's count, so the minimum
number of steps is the total deficit: for every letter, how many more
copies `s` has than `t`. (Since both strings share a length, the deficits
and surpluses balance, and each replacement clears one unit of deficit.)

One pass over `s` increments a 26-slot counter, one pass over `t`
decrements it, and the answer is the sum of the negative slots — letters
`t` lacks relative to `s`.

**Complexity:** O(n) time, O(1) space (26 counters).
