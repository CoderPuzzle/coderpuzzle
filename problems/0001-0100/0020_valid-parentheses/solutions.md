# Solutions — Valid Parentheses

## Stack

Brackets must close in the reverse order they were opened, so the most recently opened bracket is always the one that must close next — a last-in-first-out discipline that a stack models directly. The code keeps a dict mapping each closing bracket to its matching opener, so the expected partner of any closer is a single lookup.

Scan the string once. Opening brackets are pushed onto the stack. On a closing bracket, one combined test rejects the string immediately: `not stack` means there is nothing open, so the closer is unmatched, and otherwise `stack.pop()` removes the top, which must equal the opener required by `pairs[ch]` — a popped `(` against a `]` fails right there. Note the pop happens as part of the check, so no extra read-then-pop step is needed.

If the scan finishes without a rejection, the string is valid exactly when nothing is left open, hence the final `return not stack`, which catches inputs like `"((("`. The constraints guarantee every character is one of the six bracket types, so any other input would simply fall through to that same final check.

**Complexity:** `O(n)` time, `O(n)` space.
