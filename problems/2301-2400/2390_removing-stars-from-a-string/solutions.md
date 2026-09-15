# Solutions — Removing Stars From a String

## Stack of surviving characters

Processing left to right, a star always deletes the nearest character that
has not yet been deleted — which is exactly the most recently kept one.
That last-in-first-out behavior is a stack: push every letter as it
arrives, and on each star pop the top. Because the input guarantees the
operation is always possible, no underflow check is needed.

Joining the stack contents at the end yields the unique result string.

**Complexity:** `O(n)` time, `O(n)` space.
