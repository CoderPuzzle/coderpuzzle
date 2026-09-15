# Solutions — Trim Trailing Vowels

Only a suffix can be removed, so the first non-vowel encountered from the
right fixes the boundary of the answer.

## Backward scan

Start an index just after the final character. While the character before
the index is one of the five vowels, move the index left. The bounds check
comes first, allowing the index to reach zero when every character is a
vowel.

Return the prefix ending at that index. Each removed character is examined
once, and characters before the suffix do not need to be scanned.

**Complexity:** `O(n)` time, `O(n)` space.
