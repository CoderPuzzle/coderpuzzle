# Solutions — Check If Word Is Valid After Substitutions

Every insertion of `"abc"` is reversible: removing an `"abc"` substring
from a valid string leaves another valid string, all the way back down
to the empty string. Scanning `s` left to right while maintaining a
stack of the characters seen so far turns that reversal into a single
pass — whenever the top three stack entries read `'a'`, `'b'`, `'c'`
from bottom to top, they are exactly the most recently completed
insertion, so popping all three undoes it. `s` was reachable by the
operation if and only if the stack empties out by the time the scan
ends.

## Stack-based reduction

Push each character of `s` onto a stack. After every push, check whether
the top three entries are `'a'`, `'b'`, `'c'` in that order (with `'c'`
on top); if so, pop all three, collapsing that triple back out of the
string exactly as an insertion would be undone. Once the whole string
has been scanned this way, `s` is valid precisely when the stack is
empty — any leftover characters could never have come from a chain of
`"abc"` insertions.

**Complexity:** `O(n)` time, `O(n)` space, where `n` is the length of
`s`.
