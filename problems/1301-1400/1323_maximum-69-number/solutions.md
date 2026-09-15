# Maximum 69 Number

## Approach: Flip the leftmost 6

Changing a 6 to a 9 always raises the number, and a digit position further
left carries more weight — so the single best change flips the leftmost 6
to a 9. If the number contains no 6 at all, no change can help and the
value itself is the answer.

With the number as a string this is a single left-to-right scan that
replaces the first `'6'` with `'9'`; the languages with no such helper
walk the digits once instead. Every digit is inspected at most once.

**Complexity:** O(d) time with d ≤ 4 digits, O(d) space for the string form
(O(1) extra in the arithmetic variants).
