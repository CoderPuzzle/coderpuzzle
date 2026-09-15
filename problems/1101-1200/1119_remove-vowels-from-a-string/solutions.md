# Solutions — Remove Vowels from a String

## One pass, keep the non-vowels

The output preserves the order of the surviving characters, so a single
left-to-right pass decides everything: each character is tested against a
five-member vowel set and appended only when it is absent. A hash-set (or
the equivalent `switch`/`match` on the character) makes the test `O(1)`.

Building the result into a fresh buffer rather than deleting in place is
what keeps the pass linear — in-place erasure would shift the tail on every
vowel. The buffer is sized to the input length at most, and since the input
is only lowercase ASCII the whole scan is a tight loop over a thousand
bytes.

**Complexity:** `O(n)` time, `O(n)` space for the output — every character
is examined exactly once and at most `n` are kept.
