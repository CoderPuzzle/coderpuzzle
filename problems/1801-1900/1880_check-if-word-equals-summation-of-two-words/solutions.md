# Solutions — Check if Word Equals Summation of Two Words

The definition maps each word to an integer by concatenating decimal
digits, so the direct route builds that digit string per word and parses
it. The same integer falls out of a tiny positional fold: each letter's
value is one digit 0-9, so `value = value * 10 + letter_value` walks the
word left to right without any string building.

## Positional digit fold

Convert every word independently: start from 0 and for each letter add
`ord(letter) - ord('a')` as the next decimal digit. Words are at most 8
letters with digits at most 9, so values stay below `10^8` and the sum
below `2 * 10^8`. Return whether the first two values add up to the
third.

Leading 'a' letters contribute leading zero digits and therefore change
nothing — the fold handles them naturally, which is exactly what the
statement's third example checks.

**Complexity:** `O(n)` time over the total input length, `O(1)` space.
