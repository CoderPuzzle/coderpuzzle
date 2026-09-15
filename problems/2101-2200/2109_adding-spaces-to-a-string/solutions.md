# Solutions — Adding Spaces to a String

## Merge the characters with the sorted indices

Scan `s` from left to right while a second pointer identifies the next entry in `spaces`. Before appending character `i`, append a space exactly when that entry equals `i`, then advance the index pointer. Strictly increasing indices ensure that at most one space is inserted at each character.

Build the answer with a mutable buffer rather than repeated immutable-string concatenation. The buffer contains exactly the original characters plus one character per requested space.

**Complexity:** `O(n + m)` time and `O(n + m)` output space for string length `n` and `m` spaces.
