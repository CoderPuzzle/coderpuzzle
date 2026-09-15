# Decrypt String from Alphabet to Integer Mapping

## Approach: Right-to-left scan

Only a `#` can disambiguate a token, and it disambiguates backwards: the
two digits immediately before it belong to one letter in `j`..`z`, while a
digit with no `#` behind it is a single letter `a`..`i`. Scanning from the
right makes this decision locally — at each position, either a `#` sits two
places ahead (consume a three-character token) or the current digit stands
alone. A forward scan would have to look ahead and guess whether an
upcoming `#` claims the digits it just emitted.

The emitted letters come out in reverse order, so they are appended to a
buffer that is reversed once at the end. Every character is consumed
exactly once, and the whole pass is a single loop over the string.

**Complexity:** O(n) time, O(n) space for the output.
