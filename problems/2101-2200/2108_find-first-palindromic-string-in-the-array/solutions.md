# Solutions — Find First Palindromic String in the Array

## Scan in order with two pointers

Inspect the words in their given order. For each word, compare its outermost characters and move two pointers inward; the first mismatch rejects that word immediately.

Return as soon as both pointers cross without a mismatch, which preserves the required first-palindrome rule. If every word is rejected, return the empty string.

**Complexity:** `O(C)` time and `O(1)` extra space, where `C` is the total number of characters inspected.
