# Break a Palindrome

## Approach: Greedy first-half scan

A replacement breaks the palindrome exactly when the changed position and
its mirror stop matching, so changing a character in the first half (before
its mirror) suffices, and lexicographic order is decided leftmost — the
best single change is the FIRST character in the first half that can be
lowered to `'a'`. Only the first half needs scanning: a change at position
`i` and one at its mirror `n-1-i` produce the same unordered pair of
strings, so scanning the mirror side can never beat the front.

If every first-half character is already `'a'`, no lowering is possible, so
the smallest attainable string changes the LAST character to `'b'` (the
mirror of the first position, the only spot where a rise is unavoidable
and minimal). A length-1 string is always a palindrome; it returns the
empty string.

**Complexity:** O(n) time, O(n) space for the mutable copy.
